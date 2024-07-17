import type { EModules } from './enums';
import type { IAddFileVersionDto } from '../../modules/mainFile/addVersion/types';
import type { IFileEntityVersion } from '../../modules/mainFile/entity';
import type FileVersionGet from '../../modules/mainFile/get';
import type FileVersionRooster from '../../modules/mainFile/rooster';
import type { IAddNarratorStoryDto } from '../../modules/narratorStory/add/types';
import type { INarratorEntity } from '../../modules/narratorStory/entity';
import type NarratorStoryGet from '../../modules/narratorStory/get';
import type NarratorStoryRooster from '../../modules/narratorStory/rooster';
import type { IAddNpcStoryDto } from '../../modules/npcStory/add/types';
import type { INpcStoryEntity } from '../../modules/npcStory/entity';
import type NpcStoryGet from '../../modules/npcStory/get';
import type NpcStoryRooster from '../../modules/npcStory/rooster';

export interface IModulesGetControllers {
  [EModules.NpcStory]: NpcStoryGet;
  [EModules.IndexFile]: FileVersionGet;
  [EModules.NarratorStory]: NarratorStoryGet;
}

export interface IModulesControllers {
  [EModules.NpcStory]: NpcStoryRooster;
  [EModules.IndexFile]: FileVersionRooster;
  [EModules.NarratorStory]: NarratorStoryRooster;
}

export interface IRoosterAddData {
  [EModules.NpcStory]: IAddNpcStoryDto;
  [EModules.IndexFile]: IAddFileVersionDto;
  [EModules.NarratorStory]: IAddNarratorStoryDto;
}

export interface IRoosterAddDefaultData {
  [EModules.NpcStory]: Partial<INpcStoryEntity>;
  [EModules.IndexFile]: Partial<IFileEntityVersion>;
  [EModules.NarratorStory]: Partial<INarratorEntity>;
}

export interface IRoosterUpdate extends IRoosterAddDefaultData {
  [EModules.NpcStory]: Partial<INpcStoryEntity>;
  [EModules.IndexFile]: Partial<IFileEntityVersion>;
}

export interface IRoosterGetData {
  [EModules.NpcStory]: INpcStoryEntity | null;
  [EModules.IndexFile]: IFileEntityVersion | null;
  [EModules.NarratorStory]: INarratorEntity | null;
}

export interface IRoosterFactory<Z extends EModules> {
  add(data: IRoosterAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRoosterGetData[Z] | null>;
}
