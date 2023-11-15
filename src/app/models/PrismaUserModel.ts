import { User, Post } from '@prisma/client';

import { IUserCreate, IUserUpdate } from '../interfaces/User';
import IContext from '../interfaces/Context';

type Models = 'user';

export default class PrismaModel {
  constructor(private model: Models) {}

  public createUser = async (
    user: IUserCreate,
    ctx: IContext
  ): Promise<User> => {
    return ctx.prisma[this.model].create({ data: user });
  };

  public getAllUsers = async (ctx: IContext) => {
    return ctx.prisma[this.model].findMany();
  };

  public getUser = async (
    attribute: Partial<User>,
    ctx: IContext
  ): Promise<User | null> => {
    return ctx.prisma[this.model].findFirst({ where: attribute });
  };

  public updateUser = async (
    id: number,
    payload: IUserUpdate,
    ctx: IContext
  ): Promise<User | null> => {
    return ctx.prisma[this.model].update({
      where: { id },
      data: payload,
    });
  };

  public deleteUser = async (id: number, ctx: IContext) => {
    return ctx.prisma[this.model].delete({ where: { id } });
  };
}