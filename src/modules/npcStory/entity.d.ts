import type { ILine } from './types';

export interface INpcStoryEntity {
  _id: string;
  name: string;
  npcId: string;
  lines: ILine[];
}
