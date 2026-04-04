import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ideasRouter from './routes/ideas.js';

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxview';

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());
app.set('trust proxy', true);

app.use('/api/ideas', ideasRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start().catch(console.error);
