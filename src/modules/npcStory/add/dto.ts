import Validation from '../../../tools/validation';
import type { IAddNpcStoryDto } from './types';
import type { ILine } from '../types';

export default class AddNpcStoryDto implements IAddNpcStoryDto {
  name: string;
  npcId: string;
  lines: ILine[];

  constructor(data: IAddNpcStoryDto) {
    this.name = data.name;
    this.npcId = data.npcId;
    this.lines = data.lines;

    this.validate();
  }

  validate(): void {
    new Validation(this.name, 'name').isDefined().isString();
    new Validation(this.lines, 'lines').isDefined().isArray();
    new Validation(this.npcId, 'npcId').isDefined().isString().isObjectId();
  }
}
