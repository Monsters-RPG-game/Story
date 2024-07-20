import LineDto from './line.dto';
import Validation from '../../validation';
import type { INpcStoryEntity } from '../../../modules/npcStory/entity';
import type { ILine } from '../../../modules/npcStory/types';

export default class NpcEntityDto implements Omit<INpcStoryEntity, '_id'> {
  name: string;
  npcId: string;
  lines: ILine[];

  constructor(data: Omit<INpcStoryEntity, '_id'>) {
    this.name = data.name;
    this.npcId = data.npcId;
    this.lines = data.lines.map((el) => new LineDto(el));
    this.validate();
  }

  validate(): void {
    new Validation(this.name, 'name').isDefined().isString();
    new Validation(this.npcId, 'npcId').isDefined().isString().isObjectId();
    new Validation(this.lines, 'lines').isDefined().isArray();
  }
}
