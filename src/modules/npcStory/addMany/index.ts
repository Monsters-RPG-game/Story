import AddManyDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import LineDto from '../../../tools/reader/npc/line.dto';
import Rooster from '../rooster';
import type { IAddManyDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.NpcStory> {
  constructor() {
    super(new Rooster());
  }

  async addMany(data: IAddManyDto): Promise<void> {
    data.npcEntities.forEach((entry) => {
      entry.lines = entry.lines.map((line) => new LineDto(line));
    });
    const payload = new AddManyDto(data);
    await this.rooster.addMany(payload.npcEntities);
  }
}
