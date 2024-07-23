import mongoose from 'mongoose';
import type { IUserCompletion } from './types';

export const userCompletionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'userId not provided'],
  },
  stage: {
    type: Number,
    required: [true, 'Stage number not provided'],
    default: 0,
  },
  episode: {
    type: Number,
    required: [true, 'Episode number not provided'],
    default: 0,
  },
  chapter: {
    type: Number,
    required: [true, 'Chapter number not provided'],
    default: 0,
  },
});

const Narrator = mongoose.model<IUserCompletion>('UserCompletion', userCompletionSchema);
export default Narrator;
