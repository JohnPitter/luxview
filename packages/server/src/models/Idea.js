import mongoose from 'mongoose';
import { IDEA_STATUS, VALIDATION } from '@luxview/shared';

const ideaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: VALIDATION.NAME_MAX,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: VALIDATION.EMAIL_MAX,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: VALIDATION.TITLE_MAX,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: VALIDATION.DESCRIPTION_MAX,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(IDEA_STATUS),
    default: IDEA_STATUS.ACTIVE,
  },
}, { timestamps: true });

ideaSchema.index({ month: 1, year: 1, status: 1 });
ideaSchema.index({ voteCount: -1 });

export default mongoose.model('Idea', ideaSchema);
