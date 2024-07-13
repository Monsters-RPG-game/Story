import Broker from './connections/broker';
import Mongo from './connections/mongo';
// import NpcStoryController from './modules/npcStory/init';
import Liveness from './tools/liveness';
import Log from './tools/logger';
import Reader from './tools/reader';
import State from './tools/state';
import type { IFullError } from './types';

class App {
  private _liveness: Liveness | undefined;

  private get liveness(): Liveness | undefined {
    return this._liveness;
  }

  private set liveness(value: Liveness | undefined) {
    this._liveness = value;
  }

  init(): void {
    this.start().catch((err) => {
      const { stack, message } = err as IFullError;
      Log.log('Server', 'Err while initializing app');
      Log.log('Server', message, stack);
      return this.kill();
    });
  }

  kill(): void {
    State.broker.close();

    Log.log('Server', 'Server closed');
  }

  private async start(): Promise<void> {
    const mongo = new Mongo();
    State.broker = new Broker();

    await mongo.init();
    State.broker.init();
    Log.log('Server', 'Server started');

    const reader = new Reader('/home/nedzny/projects/story/src/sampleData/index.json');
    await reader.init();

    this.liveness = new Liveness();
    this.liveness.init();
  }
}

const app = new App();
app.init();
