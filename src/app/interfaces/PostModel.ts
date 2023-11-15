import { Post } from '@prisma/client';

import { IUserCreate, IUserUpdate } from './User';
import IContext from './Context';

export default interface IUserModel {
  getAll: (ctx: IContext) => Promise<Post[]>;
  getAllByAuthorId: (attribute: Partial<Post>, ctx: IContext) => Promise<Post[]>;
  deleteOne: (id: number, ctx: IContext) => Promise<Post>;
  create: (post: IUserCreate, ctx: IContext) => Promise<Post>;
  getOne: (attribute: Partial<Post>, ctx: IContext) => Promise<Post | null>;
  updateOne: (
    id: number,
    payload: IUserUpdate,
    ctx: IContext
  ) => Promise<Post | null>;
}