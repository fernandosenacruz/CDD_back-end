import { Post } from '@prisma/client';
import { extension } from 'prisma-paginate';
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
        createdAt: new Date(),
        published: false, 
      } 
    });
  };

  public getAll = async (ctx: IContext) => {
    return ctx.prisma.$extends(extension)[this.model].paginate({ page: 1, limit: 1 });
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