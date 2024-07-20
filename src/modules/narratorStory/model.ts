import mongoose from 'mongoose';
import type { INarratorStory } from './types';

const chapterSchema = new mongoose.Schema({
  chapter: {
    type: Number,
    required: [true, 'chapter number not proivded'],
  },
  line: {
    type: String,
    required: [true, 'chapter content not provided'],
  },
});

const stageSchema = new mongoose.Schema({
  stageNumber: {
    type: Number,
    required: [true, 'Stage number not provided'],
  },
  chapters: {
    type: [chapterSchema],
    default: [],
  },
});

export const narratorEntitySchema = new mongoose.Schema({
  episode: {
    type: Number,
    required: [true, 'Episode number not provided'],
  },
  stages: {
    type: [stageSchema],
    default: [],
  },
});

const Narrator = mongoose.model<INarratorStory>('Narrator', narratorEntitySchema);
export default Narrator;
