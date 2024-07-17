import TemplateFactory from './abstracts';
import NpcStory from '../../../../src/modules/npcStory/model';
import type { ILine, INpcStoryEntity } from '../../../../src/modules/npcStory/entity';
import type { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';

export default class FakeNpcStory
  extends TemplateFactory<EFakeData.NpcStory>
  implements IAbstractBody<INpcStoryEntity> {
  constructor() {
    super(NpcStory);
  }

  _id(id?: string): this {
    this.data._id = id;
    return this;
  }

  name(name?: string): this {
    this.data.name = name;
    return this;
  }

  npcId(npcId?: string): this {
    this.data.npcId = npcId;
    return this;
  }

  lines(lines?: ILine[]): this {
    this.data.lines = lines;
    return this;
  }

  protected override fillState(): void {
    this.data = {
      _id: undefined,
      name: undefined,
      npcId: undefined,
      lines: [],
    };
  }
}
