import { NextFunction, Request, Response } from 'express';

import StatusCodes from '../helpers/others/StatusCodes';
import { TypedRequest, TypedResponse } from '../interfaces';
import IContext from '../interfaces/Context';
import UserService from '../services/UserService';
import {
  IUserResponse,
  IUsersResponse,
  IUserUpdate
} from '../interfaces/User';
import { User } from '@prisma/client';

export default class UserCrontroller {
  constructor(
    private ctx: IContext,
    private clientService = new UserService()
  ) {}

  public create = async (
    req: TypedRequest<User>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IUserResponse>> => {
    const response = await this.clientService.create(req.body, this.ctx);

    return res.status(StatusCodes.CREATED).json(response);
  };

  public getAll = async (
    req: TypedRequest<any, any, any>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IUsersResponse>> => {
    const { page, limit } = req.query;
    const response = await this.clientService.getAll(
      page ? +page: page, 
      limit ? +limit: limit, 
      this.ctx
    );

    return res.status(StatusCodes.OK).json(response);
  };

  public getById = async (
    req: TypedRequest<any, any, { id: string }>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IUserResponse>> => {
    const { id } = req.params;
    const { posts, published } = req.query;
    const booleanPost = posts === 'true';
    const booleanPublished = published === 'true';

    const response = await this.clientService.getById(
      id,
      booleanPost,
      booleanPublished,
      this.ctx
    );

    return res.status(StatusCodes.OK).json(response);
  };

  public updateOne = async (
    req: TypedRequest<IUserUpdate, any, { id: string }>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IUserResponse>> => {
    const { id } = req.params;
    const payload = req.body;

    const response = await this.clientService.updateOne(id, payload, this.ctx);

    return res.status(StatusCodes.OK).json(response);
  };

  public deleteOne = async (
    req: TypedRequest<any, any, { id: string }>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IUserResponse>> => {
    const { id } = req.params;

    const { statusCode, message } = await this.clientService.deleteOne(id, this.ctx);

  return res.status(statusCode).json(message);
  };
}