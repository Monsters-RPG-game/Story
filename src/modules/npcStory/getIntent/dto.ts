import Validation from '../../../tools/validation';
import type { IGetNpcIntentDto } from './types';

export default class GetNpcIntentDto implements IGetNpcIntentDto {
  npcId: string;
  intent: string;

  constructor(data: IGetNpcIntentDto) {
    this.npcId = data.npcId;
    this.intent = data.intent;

    this.validate();
  }
  validate(): void {
    new Validation(this.npcId, 'npcId').isDefined().isString().isObjectId();
    new Validation(this.intent, 'intent').isDefined().isString();
  }
}
