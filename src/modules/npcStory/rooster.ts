import mongoose from 'mongoose';
import NpcStory from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { INpcStoryEntity } from './entity';
import type { IGetNpcIntentDto } from './getIntent/types';
import type { INpcStory, ILine } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<INpcStory, typeof NpcStory, EModules.NpcStory> {
  constructor() {
    super(NpcStory);
  }

  async getIntent(data: IGetNpcIntentDto): Promise<ILine | null> {
    const result = await this.model.aggregate([
      {
        $match: {
          npcId: new mongoose.Types.ObjectId(data.npcId),
        },
      },
      {
        $unwind: {
          path: '$lines',
        },
      },
      {
        $match: {
          'lines.intent': data.intent,
        },
      },
      {
        $project: {
          _id: 0,
          line: '$lines.line',
        },
      },
    ]);
    return !result || result.length === 0 ? null : (result[0] as ILine);
  }
  async addMany(npcEntities: Omit<INpcStoryEntity, '_id'>[]): Promise<void> {
    await this.model.insertMany(npcEntities);
  }

  async updateMany(npcEntities: Omit<INpcStoryEntity, '_id'>[]): Promise<void> {
    await this.model.updateMany(npcEntities);
  }
  async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }
}
