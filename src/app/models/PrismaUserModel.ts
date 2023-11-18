import { User } from '@prisma/client';

import { IUserCreate, IUserUpdate } from '../interfaces/User';
import IContext from '../interfaces/Context';
import IUserModel from '../interfaces/UserModel';

type Models = 'user';

export default class PrismaModel {
  constructor(private model: Models) {}

  public create = async (
    user: IUserCreate,
    ctx: IContext
  ): Promise<User> => {
    return ctx.prisma[this.model].create({ data: user });
  };

  public getAll = async (ctx: IContext) => {
    return ctx.prisma[this.model].findMany();
  };

  public getOne = async (
    attribute: Partial<User>,
    ctx: IContext
  ): Promise<User | null> => {
    return ctx.prisma[this.model].findFirst({ where: attribute });
  };

  public updateOne = async (
    id: number,
    payload: IUserUpdate,
    ctx: IContext
  ): Promise<User | null> => {
    return ctx.prisma[this.model].update({
      where: { id },
      data: payload,
    });
  };

  public deleteOne = async (id: number, ctx: IContext) => {
    return ctx.prisma[this.model].delete({ where: { id } });
  };
}
