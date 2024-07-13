import NpcStory from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { INpcStoryEntity } from './entity';
import type { INpcStory } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<INpcStory, typeof NpcStory, EModules.NpcStory> {
  constructor() {
    super(NpcStory);
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
