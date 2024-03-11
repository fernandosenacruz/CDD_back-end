import StatusCodes from '../../../app/helpers/others/StatusCodes';
import PostController from '../../../app/controllers/PostController';
import { faker } from '@faker-js/faker';
import { IPostModel, TypedRequest } from '../../../app/interfaces';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ApplicationError, ERRORS } from '../../../app/helpers/errors/error';
import {
  PostCreate,
  generateMockPost,
  generateMockPostsPaginate,
} from '../../shared/post';
import {
  Context,
  MockContext,
  createMockContext,
} from '../../shared/prisma/context';

describe('Test User Controller', () => {
  let req: TypedRequest<any, any, { id: string }>;
  const { res, next, mockClear } = getMockRes();
  let mockCtx: MockContext;
  let ctx: Context;
  const mockPostModel: IPostModel = {
    create: jest.fn(),
    getOne: jest.fn(),
    getAll: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  };

  const mockPostService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    getByAuthorId: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    postModel: mockPostModel,
  };

  beforeEach(() => {
    mockClear();
    jest.clearAllMocks();
    req = getMockReq();
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    jest.mock('../../../app/models/PrismaPostModel', () => mockPostModel);
    jest.mock('../../../app/services/PostService', () => mockPostService);
  });

  describe('Test create', () => {
    it('Should return a new user', async () => {
      const mockPost = generateMockPost({ withId: true }) as PostCreate;
      mockPostService.create.mockResolvedValue(mockPost);
      const postController = new PostController(ctx, mockPostService);

      req.body = {
        phrase: mockPost.phrase,
        authorId: mockPost.authorId,
        imgURL: mockPost.imgURL,
      };

      const response = await postController.create(req, res, next);
      expect(response.json).toEqual(mockPost);
    });
  });

  describe('Test getAll', () => {
    it('Should return all posts', async () => {
      const mockPosts = generateMockPostsPaginate(10, { withId: true });
      const page: number = 1,
        limit: number = 10;
      req.query = { page, limit };

      mockPostService.getAll.mockResolvedValue(mockPosts);

      const postController = new PostController(ctx, mockPostService);
      const response = await postController.getAll(req, res, next);

      expect(response.json).toEqual(mockPosts);
    });
  });

  describe('Test getById', () => {
    it('Should return a post', async () => {
      const mockUser = generateMockPost({ withId: true }) as PostCreate;

      mockPostService.getById.mockResolvedValue(mockUser);

      const userController = new PostController(ctx, mockPostService);
      const response = await userController.getById(req, res, next);

      expect(response.json).toEqual(mockUser);
    });

    it('Should return an error if post not found', async () => {
      const notFoundError = ERRORS.POST.NOT_FOUND;
      mockPostService.getById.mockRejectedValue(notFoundError);

      try {
        new PostController(ctx, mockPostService).getById(req, res, next);
      } catch (error) {
        const e = error as ApplicationError;
        expect(e.message).toEqual(notFoundError.message);
        expect(e.statusCode).toEqual(StatusCodes.NOT_FOUND);
      }
    });
  });

  describe('Test update', () => {
    it('Should update field and return new post', async () => {
      const mockPost = generateMockPost({ withId: true }) as PostCreate;

      const mockPayload = { phrase: faker.lorem.paragraph(1) };

      mockPostService.getById.mockResolvedValue(mockPost);
      mockPostService.updateOne.mockResolvedValue(mockPost);

      req.params = { id: `${mockPost.id}` };
      req.body = mockPayload;

      const postController = new PostController(ctx, mockPostService);
      const response = await postController.updateOne(req, res, next);

      expect(response.json).toEqual(mockPost);
    });
  });
});
