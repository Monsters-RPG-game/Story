import type mongoose, { QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';

interface IMigrationEntity {
  _id: string;
  dbName: string;
  changes: string[];
}

export interface IMigration extends IMigrationEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IMigrationFile {
  up: () => Promise<QueryWithHelpers<UpdateWriteOpResult, unknown, unknown, unknown, 'updateMany'>> | Promise<number>;
  down: () => Promise<void>;
}
