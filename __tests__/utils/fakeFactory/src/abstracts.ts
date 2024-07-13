import type { EFakeData } from '../enums';
import type { IFakeModel, IFakeState } from '../types/data';
import type mongoose from 'mongoose';

export default abstract class TemplateFactory<T extends EFakeData> {
  private readonly _targetModel: IFakeModel[T];
  private _state: IFakeState[T] = {};

  protected constructor(targetModel: IFakeModel[T]) {
    this._targetModel = targetModel;
    this.fillState();
  }

  protected get targetModel(): IFakeModel[T] {
    return this._targetModel;
  }

  protected get data(): IFakeState[T] {
    return this._state;
  }

  protected set data(value: IFakeState[T]) {
    this._state = value;
  }

  private _states: IFakeState[T][] = [];

  protected get states(): IFakeState[T][] {
    return this._states;
  }

  protected set states(value: IFakeState[T][]) {
    this._states = value;
  }

  async create(): Promise<mongoose.Types.ObjectId> {
    const newElm = new this._targetModel(this.data);
    const { _id } = await newElm.save();
    this.states.push({ ...this.data, _id });
    this.clean();
    return _id;
  }

  async cleanUp(): Promise<void> {
    await Promise.all(
      Object.values(this.states).map(async (k) => {
        return (this._targetModel as mongoose.Model<unknown>).findOneAndDelete({ _id: k._id! });
      }),
    );
    this.states = [];
  }

  protected fillState(): void {
    // abstract
  }

  private clean(): void {
    Object.entries(this.data).forEach((e) => {
      if (typeof e[1] === 'number') e[1] = 0;
      if (typeof e[1] === 'string') e[1] = undefined!;
      if (typeof e[1] === 'boolean') e[1] = false;
      if (typeof e[1] === 'undefined') e[1] = undefined!;
    });
  }
}
