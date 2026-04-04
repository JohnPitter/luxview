import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
}, { timestamps: true });

voteSchema.index({ ideaId: 1, ipAddress: 1 }, { unique: true });

export default mongoose.model('Vote', voteSchema);
