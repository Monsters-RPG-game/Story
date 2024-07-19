import NarratorStory from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { INarratorEntity } from './entity';
import type { IGetDetailedNarratorStoryDto } from './getDetailed/types';
import type { IChapter, INarratorStory } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<INarratorStory, typeof NarratorStory, EModules.NarratorStory> {
  constructor() {
    super(NarratorStory);
  }

  async getByStage(data: IGetDetailedNarratorStoryDto): Promise<(IChapter & { _id: string }) | null> {
    const result = await this.model.aggregate([
      {
        $match: {
          episode: data.episodeNumber,
        },
      },
      {
        $unwind: {
          path: '$stages',
        },
      },
      {
        $match: {
          'stages.stageNumber': data.stageNumber,
        },
      },
      {
        $unwind: {
          path: '$stages.chapters',
        },
      },
      {
        $match: {
          'stages.chapters.chapter': data.chapterNumber,
        },
      },
      {
        $project: {
          _id: '$stages.chapters._id',
          chapter: '$stages.chapters.chapter',
          line: '$stages.chapters.line',
        },
      },
    ]);
    return !result || result.length === 0 ? null : (result[0] as IChapter & { _id: string });
  }

  async addMany(narratorEntities: Omit<INarratorEntity, '_id'>[]): Promise<void> {
    await this.model.insertMany(narratorEntities);
  }
  async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }
}
