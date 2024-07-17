import type { INpcStoryEntity } from '../../../../src/modules/npcStory/entity';
import type NpcStory from '../../../../src/modules/npcStory/model';
import type { EFakeData } from '../enums';

export type IFakeParam<T> = {
  [P in keyof T]?: T[P];
};

export interface IFakeState {
  [EFakeData.NpcStory]: IFakeParam<INpcStoryEntity>;
}

export interface IFakeModel {
  [EFakeData.NpcStory]: typeof NpcStory;
}

export type IAbstractBody<T> = {
  [P in keyof T]: ([arg]?: typeof P) => this;
};
