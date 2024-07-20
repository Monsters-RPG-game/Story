import type { INarratorEntity } from '../entity';

export interface IAddManyDto {
  narratorEntities: Omit<INarratorEntity, '_id'>[];
}
