import type { INpcEntry } from './types';
import type { INarratorEntry } from '../narratorStory/types';

export interface IFileEntity {
  version: string;
  npc: INpcEntry[];
  narrator: INarratorEntry;
}
export interface IFileEntityVersion {
  _id: string;
  version: string;
}
