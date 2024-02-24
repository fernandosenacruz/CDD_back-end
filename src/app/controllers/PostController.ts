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
    const authorId: number = 0;
    const { page, limit } = req.query;
    const response = await this.postService.getAll(
      authorId,
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
  ): Promise<TypedResponse<IPostResponse>> => {
    const { id } = req.params;

    const response = await this.postService.getById(id, this.ctx);

    return res.status(StatusCodes.OK).json(response);
  };

  public getByAuthorId = async (
    req: TypedRequest<any, any, { authorId: string }>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IPostsResponse>> => {
    const { authorId } = req.params;
    const { page, limit } = req.query;

    const response = await this.postService.getByAuthorId(
      authorId,
      page ? +page: page,
      limit ? +limit: limit,  
      this.ctx
    );

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