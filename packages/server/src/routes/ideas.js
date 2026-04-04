import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Idea from '../models/Idea.js';
import Vote from '../models/Vote.js';
import { IDEA_STATUS, VALIDATION, RATE_LIMITS } from '@luxview/shared';

const router = Router();

const ideasLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: RATE_LIMITS.IDEAS_PER_HOUR,
  keyGenerator: (req) => req.ip,
  message: { error: 'Limite de submissoes atingido. Tente novamente em 1 hora.' },
});

const votesLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: RATE_LIMITS.VOTES_PER_HOUR,
  keyGenerator: (req) => req.ip,
  message: { error: 'Limite de votos atingido. Tente novamente em 1 hora.' },
});

// GET /api/ideas
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const month = Number(req.query.month) || now.getMonth() + 1;
    const year = Number(req.query.year) || now.getFullYear();

    const ideas = await Idea.find({ month, year, status: IDEA_STATUS.ACTIVE })
      .select('-email')
      .sort({ voteCount: -1, createdAt: 1 })
      .lean();

    const ip = req.ip;
    const ideaIds = ideas.map(i => i._id);
    const userVotes = await Vote.find({ ideaId: { $in: ideaIds }, ipAddress: ip })
      .select('ideaId')
      .lean();
    const votedSet = new Set(userVotes.map(v => v.ideaId.toString()));

    const result = ideas.map(idea => ({
      ...idea,
      hasVoted: votedSet.has(idea._id.toString()),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar ideias.' });
  }
});

// GET /api/ideas/winners
router.get('/winners', async (req, res) => {
  try {
    const winners = await Idea.find({ status: IDEA_STATUS.WINNER })
      .select('-email')
      .sort({ year: -1, month: -1 })
      .lean();
    res.json(winners);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contemplados.' });
  }
});

// POST /api/ideas
router.post('/', ideasLimiter, async (req, res) => {
  try {
    const { name, email, title, description } = req.body;

    if (!name || !email || !title || !description) {
      return res.status(400).json({ error: 'Todos os campos sao obrigatorios.' });
    }

    if (title.length > VALIDATION.TITLE_MAX) {
      return res.status(400).json({ error: `Titulo deve ter no maximo ${VALIDATION.TITLE_MAX} caracteres.` });
    }

    if (description.length > VALIDATION.DESCRIPTION_MAX) {
      return res.status(400).json({ error: `Descricao deve ter no maximo ${VALIDATION.DESCRIPTION_MAX} caracteres.` });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalido.' });
    }

    const now = new Date();

    const idea = await Idea.create({
      name: name.trim(),
      email: email.trim(),
      title: title.trim(),
      description: description.trim(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });

    const { email: _, ...safe } = idea.toObject();
    res.status(201).json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao submeter ideia.' });
  }
});

// POST /api/ideas/:id/vote
router.post('/:id/vote', votesLimiter, async (req, res) => {
  try {
    const { id } = req.params;
    const ip = req.ip;

    const idea = await Idea.findById(id);
    if (!idea || idea.status !== IDEA_STATUS.ACTIVE) {
      return res.status(404).json({ error: 'Ideia nao encontrada.' });
    }

    try {
      await Vote.create({ ideaId: id, ipAddress: ip });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ error: 'Voce ja votou nesta ideia.' });
      }
      throw err;
    }

    idea.voteCount += 1;
    await idea.save();

    res.json({ voteCount: idea.voteCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao votar.' });
  }
});

export default router;
