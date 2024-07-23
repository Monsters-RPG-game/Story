import type { IUserCompletionEntity } from './entity';
import type mongoose from 'mongoose';

export interface IUserCompletion extends IUserCompletionEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
