import PostService from '../../../app/services/PostService';
import MESSAGES from '../../../app/helpers/others/messages';
import StatusCodes from '../../../app/helpers/others/StatusCodes';
import { Post } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PaginationResult } from 'prisma-paginate';
import { ApplicationError } from '../../../app/helpers/errors/error';
import { IPostResponse,  IPostsResponse } from '../../../app/interfaces/Post';
import { generateMockPost,  generateMockPostsPaginate } from '../../shared/post';
import {
  Context,
  MockContext,
  createMockContext,
} from '../../shared/prisma/context';

describe('Test Post Service', () => {
  let mockCtx: MockContext;
  let ctx: Context;
  const mockPostModel = {
    create: jest.fn(),
    getOne: jest.fn(),
    getAll: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    jest.mock('../../../app/models/PrismaPostModel', () => mockPostModel);
  });

  it('Should return paginated posts', async () => {
    const mockPosts = generateMockPostsPaginate(10, { withId: true }) as PaginationResult;
    const page: number = 1;
    const limit: number = 10;
    const authorId: number = 0;
    const mockResponse: IPostsResponse = {
      posts: mockPosts,
      message: MESSAGES.POSTS.FOUND,
      statusCode: StatusCodes.OK,
    }

    mockPostModel.getAll.mockResolvedValue(mockPosts);
    const response = await new PostService(mockPostModel).getAll(authorId, page, limit, ctx);
    expect(response).toEqual(mockResponse);
  });

  it('Should return found post by id', async () => {
    const mockPost = generateMockPost({ withId: true }) as Post;
    const mockResponse: IPostResponse = { 
      post: mockPost,
      message: MESSAGES.POSTS.FOUND,
      statusCode: StatusCodes.OK
    };

    mockPostModel.getOne.mockResolvedValue(mockPost);
    const response = await new PostService(mockPostModel).getById(`${mockPost.id}`, ctx);
    expect(response).toEqual(mockResponse);
  });

  it('Should throw not found error when no post is found by id', async () => {
    const mockId = faker.string.alphanumeric();
    const notFoundError = new ApplicationError(StatusCodes.NOT_FOUND, MESSAGES.POSTS.NOT_FOUND);
    mockPostModel.getOne.mockRejectedValue(notFoundError);

    try {
      await new PostService(mockPostModel).getById(mockId, ctx);
    } catch (e) {
      const error = e as ApplicationError;
      expect(error).toBeInstanceOf(ApplicationError);
      expect(error.message).toEqual(MESSAGES.POSTS.NOT_FOUND);
      expect(error.statusCode).toEqual(StatusCodes.NOT_FOUND);
    }
  });

  it('Should update field and return new post', async () => {
    const mockPost = generateMockPost({ withId: true }) as Post;
    const mockedPayload = { phrase: faker.lorem.paragraphs(1) };
    
    mockPostModel.getOne.mockResolvedValue(mockPost);
    mockPostModel.updateOne.mockResolvedValue(mockPost)

    const response = await new PostService(mockPostModel).updateOne(`${mockPost.id}`, mockedPayload, ctx);

    mockPost.phrase = mockedPayload.phrase;
    const mockResponse: IPostResponse = { 
      post: mockPost,
      message: MESSAGES.POSTS.UPDATAED,
      statusCode: StatusCodes.OK
    };

    expect(response).toEqual(mockResponse);
  });
});
