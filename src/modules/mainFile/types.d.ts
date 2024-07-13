import type {  IFileEntityVersion } from './entity';
import type mongoose from 'mongoose';

export interface IFile extends IFileEntityVersion, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
