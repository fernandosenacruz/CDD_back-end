import { Post } from '@prisma/client';
import { PaginationResult } from 'prisma-paginate/dist/pagination/result/PaginationResult';
import { IPostUpdate } from './Post';
import IContext from './Context';

export default interface IUserModel {
  getAll: (ctx: IContext) => Promise<PaginationResult>;
  deleteOne: (id: number, ctx: IContext) => Promise<Post>;
  create: (post: Post, ctx: IContext) => Promise<Post>;
  getOne: (attribute: Partial<Post>, ctx: IContext) => Promise<Post | null>;
  updateOne: (
    id: number,
    payload: IPostUpdate,
    ctx: IContext
  ) => Promise<Post | null>;
}