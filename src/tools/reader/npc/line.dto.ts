import { ILine } from '../../../modules/npcStory/entity';
import Validation from '../../validation';

export default class LineDto implements ILine {
  intent: string;
  line: string;
  constructor(data: ILine) {
    this.intent = Object.keys(data)[0]!;
    this.line = Object.values(data)[0]! as string;
    this.validate();
  }

  validate(): void {
    new Validation(this.intent, 'intent').isDefined().isString();
    new Validation(this.line, 'line').isDefined().isString();
  }
}
