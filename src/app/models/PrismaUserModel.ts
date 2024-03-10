import { User } from '@prisma/client';
import { extension } from 'prisma-paginate';
import { IUserUpdate } from '../interfaces/User';
import { IContext } from '../interfaces';
import encryptPassword from '../utils/encryptPassword';
import { IUserModel } from '../interfaces';

type Models = 'user';

export default class PrismaModel implements IUserModel {
  constructor(private model: Models) {}

  public create = async (user: User, ctx: IContext): Promise<User> => {
    const hashedPassword = await encryptPassword(user.password);

    return ctx.prisma[this.model].create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  };

  public getAll = async (
    page: number = 1,
    limit: number = 50,
    ctx: IContext
  ) => {
    return ctx.prisma.$extends(extension)[this.model].paginate({
      page,
      limit,
      select: {
        id: true,
        name: true,
        userName: true,
        email: true,
      },
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
        posts: !posts
          ? false
          : {
              where: {
                published,
              },
              select: {
                id: true,
                phrase: true,
                imgURL: true,
                createdAt: true,
              },
              orderBy: {
                id: 'desc',
              },
            },
      },
    });
  };

  public getOneLogin = async (
    userName: string,
    ctx: IContext
  ): Promise<User | null> => {
    return ctx.prisma[this.model].findFirst({ where: { userName } });
  };

  public updateOne = async (
    id: number,
    payload: IUserUpdate,
    ctx: IContext
  ): Promise<User | null> => {
    if (payload.password) {
      const hashedPassword = await encryptPassword(payload.password);
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
