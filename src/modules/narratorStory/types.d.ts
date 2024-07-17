import type { INarratorEntity } from './entity';
import type mongoose from 'mongoose';

export interface INarratorStory extends INarratorEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
