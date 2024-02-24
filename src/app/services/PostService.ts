import { ERRORS } from '../helpers/errors/error';
import MESSAGES from '../helpers/others/messages';
import StatusCodes from '../helpers/others/StatusCodes';
import IContext from '../interfaces/Context';
import Models from '../models';
import IPostModel from './../interfaces/PostModel';
import { IPostResponse, IPostsResponse, IPostUpdate } from '../interfaces/Post';
import { Post } from '@prisma/client';
import verifyOffensiveWords from '../utils/verifyOffensiveWords';

export default class PostService {
  constructor(private postModel: IPostModel = Models.PostModel) {}

  public create = async (post: Post, ctx: IContext): Promise<IPostResponse> => {
    const { phrase } = post;
    const offensiveWords = process.env.OFFENSIVE_WORDS || '';

    const safePhase = verifyOffensiveWords(phrase, offensiveWords);
    const newPost = await this.postModel.create(
      { ...post, phrase: safePhase },
      ctx
    );

    return {
      message: MESSAGES.POSTS.CREATED + ', ' + MESSAGES.POSTS.PRIVATE,
      statusCode: StatusCodes.CREATED,
      post: newPost,
    };
  };

  public getAll = async (
    authorId: number,
    page: number,
    limit: number,
    ctx: IContext
  ): Promise<IPostsResponse> => {
    const posts = await this.postModel.getAll(authorId, page, limit, ctx);
    let message: string =
      posts.count > 0 ? MESSAGES.POSTS.FOUND : MESSAGES.POSTS.NO_CONTENT;
    let statusCode: number =
      posts.count > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT;

    return {
      message,
      statusCode,
      posts,
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
      post,
    };
  };

  public getByAuthorId = async (
    authorId: string,
    page: number,
    limit: number,
    ctx: IContext
  ): Promise<IPostsResponse> => {
    const posts = await this.postModel.getAll(+authorId, page, limit, ctx);
    let message: string =
      posts.count > 0 ? MESSAGES.POSTS.FOUND : MESSAGES.POSTS.NO_CONTENT;
    let statusCode: number =
      posts.count > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT;

    return {
      message,
      statusCode,
      posts,
    };
  };

  public updateOne = async (
    postId: string,
    payload: IPostUpdate,
    ctx: IContext
  ): Promise<IPostResponse> => {
    const post = await this.postModel.getOne({ id: +postId }, ctx);

    if (!post) throw ERRORS.POST.NOT_FOUND;

    const updatedPost = await this.postModel.updateOne(+postId, payload, ctx);

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

    await this.postModel.deleteOne(+postId, ctx);

    return {
      message: MESSAGES.POSTS.DELETED,
      statusCode: StatusCodes.OK,
    };
  };
}
