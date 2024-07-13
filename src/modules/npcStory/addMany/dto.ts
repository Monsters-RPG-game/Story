import Validation from '../../../tools/validation';
import type { IAddManyDto } from './types';
import type { INpcStoryEntity } from '../entity';

export default class AddManyDto implements IAddManyDto {
  npcEntities: Omit<INpcStoryEntity, '_id'>[];
  constructor(data: IAddManyDto) {
    this.npcEntities = data.npcEntities;
    this.validate();
  }

  validate(): void {
    new Validation(this.npcEntities, 'npcEntities').isDefined().isArray();
  }
}
