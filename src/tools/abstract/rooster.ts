import type { EModules } from './enums';
import type * as types from './types';
import type { Document, FilterQuery, Model } from 'mongoose';

export default abstract class RoosterFactory<T extends Document, U extends Model<T>, Z extends EModules>
  implements types.IRoosterFactory<Z>
{
  private readonly _model: U;

  protected constructor(model: U) {
    this._model = model;
  }

  get model(): U {
    return this._model;
  }

  async add(data: types.IRoosterAddData[Z]): Promise<string> {
    const newElement = new this.model(data);
    const callback = await newElement.save();
    return callback._id as string;
  }

  async count(filter: FilterQuery<Record<string, unknown>>): Promise<number> {
    return this.model.countDocuments(filter);
  }

  /**
   * Create element with default data
   */
  async addDefault(data: types.IRoosterAddDefaultData[Z]): Promise<string> {
    const newElement = new this.model(data);
    const callback = await newElement.save();
    return callback._id as string;
  }

  async get(_id: unknown): Promise<types.IRoosterGetData[Z] | null> {
    return this.model.findOne({ _id } as FilterQuery<Record<string, unknown>>).lean();
  }

  async update(id: string, data: types.IRoosterUpdate[Z]): Promise<void> {
    await this.model.findOneAndUpdate({ _id: id } as FilterQuery<Record<string, unknown>>, data);
  }
}
