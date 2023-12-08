import { NextFunction, Request, Response } from 'express';

import StatusCodes from '../helpers/others/StatusCodes';
import { TypedRequest, TypedResponse } from '../interfaces';
import IContext from '../interfaces/Context';
import PostService from '../services/PostService';
import {
  IPostResponse,
  IPostsResponse,
  IPostUpdate,
} from '../interfaces/Post';
import { Post } from '@prisma/client';

export default class PostCrontroller {
  constructor(
    private ctx: IContext,
    private postService = new PostService()
  ) {}

  public create = async (
    req: TypedRequest<Post>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IPostResponse>> => {
    const response = await this.postService.create(req.body, this.ctx);

    return res.status(StatusCodes.CREATED).json(response);
  };

  public getAll = async (
    req: TypedRequest<any, any, any>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IPostsResponse>> => {
    const response = await this.postService.getAll(this.ctx);

    return res.status(StatusCodes.OK).json(response);
  };

  public getById = async (
    req: TypedRequest<any, any, { id: string }>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IPostResponse>> => {
    const { id } = req.params;

    const response = await this.postService.getById(id, this.ctx);

    return res.status(StatusCodes.OK).json(response);
  };

  public updateOne = async (
    req: TypedRequest<IPostUpdate, any, { id: string }>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IPostResponse>> => {
    const { id } = req.params;
    const payload = req.body;

    const response = await this.postService.updateOne(id, payload, this.ctx);

    return res.status(StatusCodes.OK).json(response);
  };

  public deleteOne = async (
    req: TypedRequest<any, any, { id: string }>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IPostResponse>> => {
    const { id } = req.params;

    const response = await this.postService.deleteOne(id, this.ctx);

    return res.status(StatusCodes.OK).json(response);
  };
}