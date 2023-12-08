import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IUserUpdate } from '../interfaces/User';
import IContext from '../interfaces/Context';

type Models = 'user';

export default class PrismaModel {
  constructor(private model: Models) {}

  public create = async (
    user: User,
    ctx: IContext
  ): Promise<User> => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return ctx.prisma[this.model].create({ 
      data: {
        ...user,
        password: hashedPassword
      }
    });
  };

  public getAll = async (ctx: IContext) => {
    return ctx.prisma[this.model].findMany({
      select: {
        id: true,
        name: true,
        userName: true,
        email: true,
      }
    });
  };

  public getOne = async (
    attribute: Partial<User>,
    posts: boolean,
    published: boolean,
    ctx: IContext
  ): Promise<Partial<User> | null> => {
    return ctx.prisma[this.model].findFirst({ 
      where: attribute,
      select: {
        id: true,
        name: true,
        email: true,
        userName: true,
        posts: !posts ? false : {
          where: {
            published
          },
          select: {
            id: true,
            phrase: true,
            imgURL: true,
            createdAt: true,
          },
          orderBy: {
            id: 'desc'
          }
        }
        
      } 
    });
  };

  public updateOne = async (
    id: number,
    payload: IUserUpdate,
    ctx: IContext
  ): Promise<User | null> => {
    if (payload.password) {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;
    }

    return ctx.prisma[this.model].update({
      where: { id },
      data: payload,
    });
  };

  public deleteOne = async (id: number, ctx: IContext) => {
    return ctx.prisma[this.model].delete({ where: { id } });
  };
}
