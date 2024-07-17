import type { INarratorEntry } from '../narratorStory/entity';

export interface INpcEntry {
  [id: string]: string;
}

export interface IFileEntity {
  version: string;
  npc: INpcEntry[];
  narrator: INarratorEntry;
}
export interface IFileEntityVersion {
  _id: string;
  version: string;
}
