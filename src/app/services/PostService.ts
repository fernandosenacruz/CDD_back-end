import ERRORS from '../helpers/errors/error';
import MESSAGES from '../helpers/others/messages';
import StatusCodes from '../helpers/others/StatusCodes';
import IContext from '../interfaces/Context';
import Models from '../models';
import IPostModel  from './../interfaces/PostModel';
import {
  IPostResponse,
  IPostsResponse,
  IPostUpdate,
} from '../interfaces/Post';
import { Post } from '@prisma/client';

export default class PostService {
  constructor(private postModel: IPostModel = Models.PostModel) {}

  public create = async (
    post: Post,
    ctx: IContext
  ): Promise<IPostResponse> => {
    const newPost = await this.postModel.create(post, ctx);

    return {
      message: MESSAGES.POSTS.CREATED + ' ' + MESSAGES.POSTS.PRIVATE,
      statusCode: StatusCodes.CREATED,
      post: newPost
    };
  };

  public getAll = async (page:number, limit: number, ctx: IContext): Promise<IPostsResponse> => {
    const posts = await this.postModel.getAll(page, limit, ctx);

    return {
      message: MESSAGES.POSTS.FOUND,
      statusCode: StatusCodes.OK,
      posts
    };
  };

  public getById = async (
    postId: string,
    ctx: IContext
  ): Promise<IPostResponse> => {
    const post = await this.postModel.getOne({ id: +postId }, ctx);

    if (!post) throw ERRORS.POST.NOT_FOUND;

    return {
      message: MESSAGES.POSTS.FOUND,
      statusCode: StatusCodes.OK,
      post
    };
  };

  public updateOne = async (
    postId: string,
    payload: IPostUpdate,
    ctx: IContext
  ): Promise<IPostResponse> => {
    const post = await this.postModel.getOne({ id: +postId }, ctx);

    if (!post) throw ERRORS.POST.NOT_FOUND;

    const updatedPost = await this.postModel.updateOne(
      +postId,
      payload,
      ctx
    );

    return {
      message: MESSAGES.POSTS.UPDATAED,
      statusCode: StatusCodes.OK,
      post: updatedPost,
    };
  };

  public deleteOne = async (
    postId: string,
    ctx: IContext
  ): Promise<IPostResponse> => {
    const post = await this.postModel.getOne({ id: +postId }, ctx);

    if (!post) throw ERRORS.USER.NOT_FOUND;

    await this.postModel.deleteOne(
      +postId,
      ctx
    );

    return {
      message: MESSAGES.POSTS.DELETED,
      statusCode: StatusCodes.OK,
    };
  };
}