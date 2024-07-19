import TemplateFactory from './abstracts';
import FileVersion from '../../../../src/modules/mainFile/model';
import type { IFileEntityVersion } from '../../../../src/modules/mainFile/entity';
import type { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';

export default class FakeNpcStory
  extends TemplateFactory<EFakeData.MainFile>
  implements IAbstractBody<IFileEntityVersion> {
  constructor() {
    super(FileVersion);
  }

  _id(id?: string): this {
    this.data._id = id;
    return this;
  }

  version(version?: string): this {
    this.data.version = version;
    return this;
  }

  protected override fillState(): void {
    this.data = {
      _id: undefined,
      version: undefined,
    };
  }
}
