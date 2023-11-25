import { Post } from '@prisma/client';

import { IPostUpdate } from '../interfaces/Post';
import IContext from '../interfaces/Context';

type Models = 'post';

export default class PrismaModel {
  constructor(private model: Models) {}

  public create = async (
    post: Post,
    ctx: IContext
  ): Promise<Post> => {
    return ctx.prisma[this.model].create({ 
      data: 
      { ...post, 
        createdAt: new Date() 
      } 
    });
  };

  public getAll = async (ctx: IContext) => {
    return ctx.prisma[this.model].findMany();
  };

  public getAllByAuthorId = async (
    attribute: Partial<Post>,
    ctx: IContext
  ): Promise<Post[]> => {
    return ctx.prisma[this.model].findMany({ where: attribute });
  };

  public getOne = async (
    attribute: Partial<Post>,
    ctx: IContext
  ): Promise<Post | null> => {
    return ctx.prisma[this.model].findFirst({ where: attribute });
  };

  public updateOne = async (
    id: number,
    post: IPostUpdate,
    ctx: IContext
  ): Promise<Post | null> => {
    return ctx.prisma[this.model].update({
      where: { id },
      data: { 
        ...post, 
        updatedAt: new Date() 
      }
    });
  };

  public deleteOne = async (id: number, ctx: IContext) => {
    return ctx.prisma[this.model].delete({ where: { id } });
  };
}