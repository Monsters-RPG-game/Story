import { ILine } from '../entity';

export interface IAddNpcStoryDto {
  name: string;
  npcId: string;
  lines: ILine[];
}
