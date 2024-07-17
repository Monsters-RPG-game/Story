import { ILine } from '../types';

export interface IAddNpcStoryDto {
  name: string;
  npcId: string;
  lines: ILine[];
}
