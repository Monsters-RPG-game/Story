import mongoose from 'mongoose';
import type { INpcStory } from './types';

const linesSchema = new mongoose.Schema({
  intent: {
    type: String,
    required: [true, 'Intent not provided'],
  },
  line: {
    type: String,
    required: [true, 'Line not provided'],
  },
});

export const npcStorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  npcId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'npcId not provided'],
    unique: true,
  },
  lines: {
    type: [linesSchema],
    default: [],
  },
});

const NpcStory = mongoose.model<INpcStory>('NpcStory', npcStorySchema);
export default NpcStory;
