import ERRORS from '../helpers/errors/error';
import MESSAGES from '../helpers/others/messages';
import StatusCodes from '../helpers/others/StatusCodes';
import IContext from '../interfaces/Context';
import Models from '../models';
import IUserModel  from './../interfaces/UserModel';
import {
  IUserResponse,
  IUsersResponse,
  IUserUpdate
} from '../interfaces/User';
import { User } from '@prisma/client';

export default class UserService {
  constructor(private userModel: IUserModel = Models.UserModel) {}

  public create = async (
    user: User,
    ctx: IContext
  ): Promise<IUserResponse> => {
    const emailExists = await this.userModel.getOne(
      { email: user.email },
      false,
      false,
      ctx
    );

    if (emailExists) throw ERRORS.USER.EMAIL_EXISTS;

    const newUser = await this.userModel.create(user, ctx);

    return {
      message: MESSAGES.USERS.CREATED,
      statusCode: StatusCodes.CREATED,
      user: newUser,
    };
  };

  public getAll = async (ctx: IContext): Promise<IUsersResponse> => {
    const users = await this.userModel.getAll(ctx);

    return {
      message: MESSAGES.USERS.FOUND,
      statusCode: StatusCodes.OK,
      users,
    };
  };

  public getById = async (
    userId: string,
    posts: boolean,
    published: boolean,
    ctx: IContext
  ): Promise<IUserResponse> => {
    const user = await this.userModel.getOne(
      { id: +userId }, 
      posts,
      published,
      ctx
    );

    if (!user) throw ERRORS.USER.NOT_FOUND;

    return {
      message: MESSAGES.USERS.FOUND,
      statusCode: StatusCodes.OK,
      user,
    };
  };

  public updateOne = async (
    userId: string,
    payload: IUserUpdate,
    ctx: IContext
  ): Promise<IUserResponse> => {
    const user = await this.userModel.getOne({ id: +userId }, false, false, ctx);

    if (!user) throw ERRORS.USER.NOT_FOUND;

    const updatedUser = await this.userModel.updateOne(
      +userId,
      payload,
      ctx
    );

    return {
      message: MESSAGES.USERS.UPDATAED,
      statusCode: StatusCodes.OK,
      user: updatedUser,
    };
  };

  public deleteOne = async (
    userId: string,
    ctx: IContext
  ): Promise<IUserResponse> => {
    const user = await this.userModel.getOne({ id: +userId }, false, false, ctx);

    if (!user) throw ERRORS.USER.NOT_FOUND;

    await this.userModel.deleteOne(
      +userId,
      ctx
    );

    return {
      message: MESSAGES.USERS.DELETED,
      statusCode: StatusCodes.OK,
    };
  };
}
