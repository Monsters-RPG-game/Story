import Validation from '../../../tools/validation';
import type { IAddManyDto } from './types';
import type { INarratorEntity } from '../entity';

export default class AddManyDto implements IAddManyDto {
  narratorEntities: Omit<INarratorEntity, '_id'>[];
  constructor(data: IAddManyDto) {
    this.narratorEntities = data.narratorEntities;
    this.validate();
  }

  validate(): void {
    new Validation(this.narratorEntities, 'narratorEntities').isDefined().isArray();
  }
}
