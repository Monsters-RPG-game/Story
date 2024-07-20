import type { INpcStoryEntity } from './entity';
import type mongoose from 'mongoose';

export interface INpcStory extends INpcStoryEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface ILine {
  intent: string;
  line: string;
}
