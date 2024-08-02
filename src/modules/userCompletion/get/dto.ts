import Validation from '../../../tools/validation';
import type { IGetUserCompletionDto } from './types';

export default class GetUserCompletionDto implements IGetUserCompletionDto {
  userId: string;

  constructor(data: IGetUserCompletionDto) {
    this.userId = data.userId;

    this.validate();
  }

  validate(): void {
    new Validation(this.userId, 'userId').isDefined().isString().isObjectId();
  }
}
