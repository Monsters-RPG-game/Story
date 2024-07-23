import UserCompletion from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { IUserCompletion } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<IUserCompletion, typeof UserCompletion, EModules.UserCompletion> {
  constructor() {
    super(UserCompletion);
  }
}
