import Validation from '../../../tools/validation';
import type { IAddUserCompletionDto } from './types';

export default class AddUserCompletionDto implements IAddUserCompletionDto {
  userId: string;
  stage: number;
  episode: number;
  chapter: number;
  constructor(data: IAddUserCompletionDto) {
    this.userId = data.userId;
    this.stage = data.stage;
    this.episode = data.episode;
    this.chapter = data.chapter;

    this.validate();
  }

  validate(): void {
    new Validation(this.userId, 'userId').isDefined().isString().isObjectId()
    new Validation(this.stage, 'stage').isDefined().isNumber();
    new Validation(this.chapter, 'chapter').isDefined().isNumber();
    new Validation(this.episode, 'episode').isDefined().isNumber();
  }
}
