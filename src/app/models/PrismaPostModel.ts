import { Post } from '@prisma/client';
import { PaginationResult, extension } from 'prisma-paginate';
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

  public getAll = async (authorId: number, page: number = 1, limit: number = 50, ctx: IContext) => {
    let result: PaginationResult; 

    if (authorId > 0) {
      result = await ctx.prisma.$extends(extension)[this.model].paginate({ where: { authorId } }, { page,limit });
    } else {
      result = await ctx.prisma.$extends(extension)[this.model].paginate({ page,limit });
    }

    return result;
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