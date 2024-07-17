import FakeNpcStory from './npcStory';

export default class FakeFactory {
  private readonly _npcStory: FakeNpcStory;

  constructor() {
    this._npcStory = new FakeNpcStory();
  }

  public get npcStory(): FakeNpcStory {
    return this._npcStory;
  }

  async cleanUp(): Promise<void> {
    await this.npcStory.cleanUp();
  }
}
