import type { INarratorEntity } from './entity';
import type mongoose from 'mongoose';

export interface INarratorStory extends INarratorEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface INarratorEpisode {
  [key: string]: string;
}
export interface INarratorEntry {
  episodes: INarratorEpisode[];
}

export interface IChapter {
  chapter: number;
  line: string;
}

export interface IStage {
  stageNumber: number;
  chapters: IChapter[];
}
