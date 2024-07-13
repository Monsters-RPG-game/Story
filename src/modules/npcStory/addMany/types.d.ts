import type { INpcStoryEntity } from '../entity';

export interface IAddManyDto {
  npcEntities: Omit<INpcStoryEntity, '_id'>[];
}
