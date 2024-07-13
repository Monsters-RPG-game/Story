import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import Handler from '../../../src/modules/user/handler';
import * as utils from '../../utils';
import { sleep } from '../../utils';
import type { IInventoryEntity } from '../../../src/modules/inventory/entity';
import type { IPartyEntity } from '../../../src/modules/party/entity';
import type { IProfileEntity } from '../../../src/modules/profile/entity';
import type { ISkillsEntity } from '../../../src/modules/skills/entity';
import type { IStatsEntity } from '../../../src/modules/stats/entity';
import type { IUserEntity } from '../../../src/modules/user/entity';
import type { IRemoveUserDto } from '../../../src/modules/user/remove/types';

describe('Remove user', () => {
  const db = new utils.FakeFactory();
  const fakeUser = utils.fakeData.users[0] as IUserEntity;
  const fakeUser2 = utils.fakeData.users[1] as IUserEntity;
  const fakeProfile = utils.fakeData.profiles[0] as IProfileEntity;
  const fakeInv = utils.fakeData.inventories[0] as IInventoryEntity;
  const fakeSkills = utils.fakeData.skills[0] as ISkillsEntity;
  const fakeParty = utils.fakeData.parties[0] as IPartyEntity;
  const fakeStats = utils.fakeData.stats[0] as IStatsEntity;
  const remove: IRemoveUserDto = {
    password: fakeUser.password,
  };
  const handler = new Handler();

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('Incorrect data', () => {
      beforeEach(async () => {
        await sleep(300);
        await db.user
          ._id(fakeUser._id)
          .login(fakeUser.login)
          .password(fakeUser.password)
          .email(fakeUser.email)
          .verified(fakeUser.verified)
          .create();
      });

      afterEach(async () => {
        await db.cleanUp();
      });

      it('No user with provided id', () => {
        handler.remove(fakeUser2.login, fakeUser2._id).catch((err) => {
          expect(err).toEqual(new errors.NoUser());
        });
      });
    });
  });

  describe('Should pass', () => {
    it('Removed', async () => {
      await db.user
        ._id(fakeUser._id)
        .login(fakeUser.login)
        .password(fakeUser.password)
        .email(fakeUser.email)
        .verified(fakeUser.verified)
        .create();

      await db.profile
        ._id(fakeProfile._id)
        .user(fakeProfile.user)
        .lvl(fakeProfile.lvl)
        .exp(fakeProfile.exp)
        .race(fakeProfile.race)
        .friends(fakeProfile.friends)
        .inventory(fakeInv._id)
        .skills(fakeSkills._id)
        .party(fakeParty._id)
        .stats(fakeStats._id)
        .create();

      try {
        await handler.remove(remove.password, fakeUser._id);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
