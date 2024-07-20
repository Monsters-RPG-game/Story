import type { IFileEntityVersion } from '../../../../src/modules/mainFile/entity';
import type FileVersion from '../../../../src/modules/mainFile/model';
import type { INpcStoryEntity } from '../../../../src/modules/npcStory/entity';
import type NpcStory from '../../../../src/modules/npcStory/model';
import type { EFakeData } from '../enums';

export type IFakeParam<T> = {
  [P in keyof T]?: T[P];
};

export interface IFakeState {
  [EFakeData.NpcStory]: IFakeParam<INpcStoryEntity>;
  [EFakeData.MainFile]: IFakeParam<IFileEntityVersion>;
}

export interface IFakeModel {
  [EFakeData.NpcStory]: typeof NpcStory;
  [EFakeData.MainFile]: typeof FileVersion;
}

export type IAbstractBody<T> = {
  [P in keyof T]: ([arg]?: typeof P) => this;
};
