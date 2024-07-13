import mongoose from 'mongoose';
import type { IFile } from './types';

export const fileVersionSchema = new mongoose.Schema({
  v: {
    type: String,
  },
});

const FileVersion = mongoose.model<IFile>('FileVersion', fileVersionSchema);
export default FileVersion;
