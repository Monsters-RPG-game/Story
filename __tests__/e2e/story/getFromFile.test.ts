import { describe, it, expect, jest, afterEach } from '@jest/globals';
import fakeData from '../../utils/fakeData.json';
import * as errors from '../../../src/errors';
import FakeFS from '../../utils/fakeFs';

jest.mock('fs', () => {
  return FakeFS;
});

import fs from 'fs';
import Reader from '../../../src/tools/reader';
// import type { IFileEntity } from '../../../src/modules/mainFile/entity';
import type { INarratorEntity } from '../../../src/modules/narratorStory/entity';
import { INpcStoryEntity } from '../../../src/modules/npcStory/entity';

console.log(fs.existsSync);

describe('story', () => {
  afterEach(() => {
    FakeFS.clean();
  });

  const fakeIndex = JSON.stringify(fakeData.fakeIndex[0]);
  const fakeIndex2 = JSON.stringify(fakeData.fakeIndex[1]);
  const fakeIndex3 = JSON.stringify(fakeData.fakeIndex[2]);
  const fakeNarrator = JSON.stringify(fakeData.fakeNarrator[0]);
  const npc1 = JSON.stringify(fakeData.fakeNpc[0]);
  const npc2 = JSON.stringify(fakeData.fakeNpc[1]);
  describe('should throw', () => {
    describe('no data passed', () => {
      // it('missing version', async () => {
      //   const cloneIndex = structuredClone(JSON.parse(fakeIndex)) as Partial<IFileEntity>;
      //   delete cloneIndex.version;
      //   FakeFS.addFakeIndex('/index.json', JSON.stringify(cloneIndex as string));
      //   FakeFS.addFakeNarrator('/narrator_1.json', fakeNarrator);
      //   FakeFS.addFakeNpc('/npc1.json', npc1);
      //   FakeFS.addFakeNpc('/npc2.json', npc2);
      //   try {
      //     const reader = new Reader('/index.json');
      //     await reader.init();
      //   } catch (error) {
      //     expect(error).toEqual(new errors.MissingArgError('version'));
      //   }
      // });

      // it('missing file', async () => {
      //   let cloneIndex = structuredClone(JSON.parse(fakeIndex)) as Partial<IFileEntity>;
      //   cloneIndex = undefined!;
      //   FakeFS.addFakeIndex('/index.json', JSON.stringify(cloneIndex as string));
      //   FakeFS.addFakeNarrator('/narrator_1.json', fakeNarrator);
      //   FakeFS.addFakeNpc('/npc1.json', npc1);
      //   FakeFS.addFakeNpc('/npc2.json', npc2);
      //   try {
      //     const reader = new Reader('somepath');
      //     await reader.init();
      //   } catch (error) {
      //     expect(error).toEqual(new errors.FileDoesNotExist());
      //   }
      // });

      describe('incorrect data', () => {
        it('episode number in index and narrator file doesnt match', async () => {
          const cloneNarrator = structuredClone(JSON.parse(fakeNarrator)) as INarratorEntity;
          cloneNarrator.episode = 19;
          FakeFS.addFakeIndex('/index.json', fakeIndex);
          FakeFS.addFakeNarrator('/narrator_1.json', JSON.stringify(cloneNarrator));
          FakeFS.addFakeNpc('/npc1.json', npc1);
          FakeFS.addFakeNpc('/npc2.json', npc2);
          let error: Error = {
            name: '',
            message: '',
          };
          try {
            const reader = new Reader('/index.json');
            await reader.init();
          } catch (err) {
            error = err as Error;
            expect(error).toEqual(new errors.EpisodeNumberIncorrect());
          }
        });

        it('episode number repeats in narrator files', async () => {
          const cloneNarrator = structuredClone(JSON.parse(fakeNarrator)) as INarratorEntity;
          FakeFS.addFakeIndex('/index.json', fakeIndex2);
          FakeFS.addFakeNarrator('/narrator_1.json', fakeNarrator);
          FakeFS.addFakeNarrator('/narrator_2.json', JSON.stringify(cloneNarrator));
          FakeFS.addFakeNpc('/npc1.json', npc1);
          FakeFS.addFakeNpc('/npc2.json', npc2);
          let error: Error = {
            name: '',
            message: '',
          };
          try {
            const reader = new Reader('/index.json');
            await reader.init();
          } catch (err) {
            error = err as Error;
          }
          expect(error).toEqual(new errors.EpisodeNumberIncorrect());
        });
        it('stage number repeats in narrator file', async () => {
          const cloneNarrator = structuredClone(JSON.parse(fakeNarrator)) as INarratorEntity;
          cloneNarrator.episode = 2;
          cloneNarrator.stages[1]!.stageNumber = 1;
          FakeFS.addFakeIndex('/index.json', fakeIndex2);
          FakeFS.addFakeNarrator('/narrator_1.json', fakeNarrator);
          FakeFS.addFakeNarrator('/narrator_2.json', JSON.stringify(cloneNarrator));
          FakeFS.addFakeNpc('/npc1.json', npc1);
          FakeFS.addFakeNpc('/npc2.json', npc2);
          let error: Error = {
            name: '',
            message: '',
          };
          try {
            const reader = new Reader('/index.json');
            await reader.init();
          } catch (err) {
            error = err as Error;
          }
          expect(error).toEqual(new errors.StageNumberPresent());
        });
        it('chapter number repeats in narrator file', async () => {
          const cloneNarrator = structuredClone(JSON.parse(fakeNarrator)) as INarratorEntity;
          cloneNarrator.stages[0]!.chapters[1]!.chapter = 1
          FakeFS.addFakeIndex('/index.json', fakeIndex);
          FakeFS.addFakeNarrator('/narrator_1.json', JSON.stringify(cloneNarrator));
          FakeFS.addFakeNpc('/npc1.json', npc1);
          FakeFS.addFakeNpc('/npc2.json', npc2);
          let error: Error = {
            name: '',
            message: '',
          };
          try {
            const reader = new Reader('/index.json');
            await reader.init();
          } catch (err) {
            error = err as Error;
          }
          expect(error).toEqual(new errors.ChapterNumberPresent());
        });

        it('npcId doesnt match in index and npc file', async () => {
          const cloneNpc1 = structuredClone(JSON.parse(npc1)) as INpcStoryEntity;
          cloneNpc1.npcId = '6465bd2cc9f753720afeeaa1'
          FakeFS.addFakeIndex('/index.json', fakeIndex);
          FakeFS.addFakeNarrator('/narrator_1.json', fakeNarrator);
          FakeFS.addFakeNpc('/npc1.json', JSON.stringify(cloneNpc1));
          FakeFS.addFakeNpc('/npc2.json', npc2);
          let error: Error = {
            name: '',
            message: '',
          };
          try {
            const reader = new Reader('/index.json');
            await reader.init();
          } catch (err) {
            error = err as Error;
          }
          expect(error).toEqual(new errors.FileIdDoesntMatchEntity());
        });
      });
    });
  });
  // TODO:
  // this is proper way
  // "episodes": [
  //   {
  //     "1": "narrator_1.json"
  //   },
  //   {
  //     "2": "narrator_2.json"
  //   }
  // ]
  // prevent this:
  // "episodes": [
  //   {
  //     "1": "narrator_1.json",
  //     "2": "narrator_2.json"
  //   }
  //   ]

  describe('should pass', () => {
    it('populate db when its empty', async () => {
      FakeFS.addFakeIndex('/index.json', fakeIndex3);
      FakeFS.addFakeNarrator('/narrator_1.json', fakeNarrator);
      FakeFS.addFakeNarrator('/narrator_2.json', fakeNarrator);
      FakeFS.addFakeNpc('/npc1.json', npc1);
      FakeFS.addFakeNpc('/npc2.json', npc2);
      let error: Error = {
        name: '',
        message: '',
      };
      try {
        const reader = new Reader('/index.json');
        await reader.init();
        expect(reader.fileEntity).toEqual(JSON.parse(fakeIndex));
      } catch (err) {
        error = err as Error;
        expect(error).toBeUndefined();
      }
    });

    it('populate db when its empty', async () => {
      FakeFS.addFakeIndex('/index.json', fakeIndex3);
      FakeFS.addFakeNarrator('/narrator_1.json', fakeNarrator);
      FakeFS.addFakeNarrator('/narrator_2.json', fakeNarrator);
      FakeFS.addFakeNpc('/npc1.json', npc1);
      FakeFS.addFakeNpc('/npc2.json', npc2);
      let error: Error = {
        name: '',
        message: '',
      };
      try {
        const reader = new Reader('/index.json');
        await reader.init();
        expect(reader.fileEntity).toEqual(JSON.parse(fakeIndex));
      } catch (err) {
        error = err as Error;
        expect(error).toBeUndefined();
      }
    });
  });
});
