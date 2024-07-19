import FakeNpcStory from './npcStory';
import FakeFileVersion from './fileVersion';

export default class FakeFactory {
  private readonly _npcStory: FakeNpcStory;
  private readonly _fileVersion: FakeFileVersion;

  constructor() {
    this._npcStory = new FakeNpcStory();
    this._fileVersion = new FakeFileVersion();
  }

  public get npcStory(): FakeNpcStory {
    return this._npcStory;
  }
  public get fileVersion(): FakeFileVersion {
    return this._fileVersion;
  }

  async cleanUp(): Promise<void> {
    await this.npcStory.cleanUp();
    await this.fileVersion.cleanUp();
  }
}
