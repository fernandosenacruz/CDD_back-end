import { User } from '@prisma/client';

import { IUserUpdate } from './User';
import IContext from './Context';
import { PaginationResult } from 'prisma-paginate/dist/pagination/result/PaginationResult';

export default interface IUserModel {
  getAll: (page: number, limit: number, ctx: IContext) => Promise<PaginationResult>;
  deleteOne: (id: number, ctx: IContext) => Promise<User>;
  create: (user: User, ctx: IContext) => Promise<User>;
  getOne: (
    attribute: Partial<User>, 
    posts: boolean, 
    published:boolean, 
    ctx: IContext
  ) => Promise<Partial<User> | null>;
  updateOne: (
    id: number,
    payload: IUserUpdate,
    ctx: IContext
  ) => Promise<User | null>;
}