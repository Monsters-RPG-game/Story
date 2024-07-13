import type { IInventoryEntity } from '../../../../src/modules/inventory/entity';
import type Inventory from '../../../../src/modules/inventory/model';
import type { IPartyEntity } from '../../../../src/modules/party/entity';
import type { ISkillsEntity } from '../../../../src/modules/skills/entity';
import type Skills from '../../../../src/modules/skills/model';

export type IFakeParam<T> = {
  [P in keyof T]?: T[P];
};

export interface IFakeState {
  [EFakeData.Skills]: IFakeParam<ISkillsEntity>;
}

export interface IFakeModel {
  [EFakeData.Skills]: typeof Skills;
}

export type IAbstractBody<T> = {
  [P in keyof T]: ([arg]?: typeof P) => this;
};
