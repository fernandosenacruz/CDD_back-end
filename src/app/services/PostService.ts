import ERRORS from '../helpers/errors/error';
import MESSAGES from '../helpers/others/messages';
import StatusCodes from '../helpers/others/StatusCodes';
import IContext from '../interfaces/Context';
import PostModel from '../models/PrismaPostModel';
import IPostModel  from './../interfaces/PostModel';
import {
  IPost,
  IPostResponse,
  IPostsResponse,
  IPostUpdate,
} from '../interfaces/Post';

export default class PostService {
  constructor(private postModel: IPostModel = PostModel) {}

  public create = async (
    post: IPost,
    ctx: IContext
  ): Promise<IPostResponse> => {
    const newPost = await this.postModel.create(post, ctx);

    return {
      message: MESSAGES.USERS.CREATED,
      statusCode: StatusCodes.CREATED,
      post: newPost
    };
  };

  public getAll = async (ctx: IContext): Promise<IPostsResponse> => {
    const posts = await this.postModel.getAll(ctx);

    return {
      message: MESSAGES.USERS.FOUND,
      statusCode: StatusCodes.OK,
      posts
    };
  };

  public getByUserId = async (
    postId: string,
    ctx: IContext
    ): Promise<IPostsResponse> => {
    const posts = await this.postModel.getAllByAuthorId({ authorId: +postId }, ctx);

    return {
      message: MESSAGES.USERS.FOUND,
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
      message: MESSAGES.USERS.FOUND,
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
      message: MESSAGES.USERS.UPDATAED,
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
      message: MESSAGES.USERS.DELETED,
      statusCode: StatusCodes.OK,
    };
  };
}