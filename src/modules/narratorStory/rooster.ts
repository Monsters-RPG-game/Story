import NarratorStory from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { INarratorEntity } from './entity';
import type { INarratorStory } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<INarratorStory, typeof NarratorStory, EModules.NarratorStory> {
  constructor() {
    super(NarratorStory);
  }

  async addMany(narratorEntities: Omit<INarratorEntity, '_id'>[]): Promise<void> {
    await this.model.insertMany(narratorEntities);
  }
  async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }
}
