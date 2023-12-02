import { User } from '@prisma/client';

import { IUserUpdate } from './User';
import IContext from './Context';

export default interface IUserModel {
  getAll: (ctx: IContext) => Promise<Partial<User>[]>;
  deleteOne: (id: number, ctx: IContext) => Promise<User>;
  create: (user: User, ctx: IContext) => Promise<User>;
  getOne: (attribute: Partial<User>, ctx: IContext) => Promise<User | null>;
  updateOne: (
    id: number,
    payload: IUserUpdate,
    ctx: IContext
  ) => Promise<User | null>;
}