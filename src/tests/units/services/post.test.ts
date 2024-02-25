import { Post } from '@prisma/client';
import { faker } from '@faker-js/faker';
import AuthHelper from '../../../app/helpers/auths/auth';
import { ApplicationError } from '../../../app/helpers/errors/error';
import { generateMockPost, generateMockPosts } from '../../shared/post';
import PostService from '../../../app/services/PostService';
import {
  Context,
  MockContext,
  createMockContext,
} from '../../shared/prisma/context';
import { IPostUpdate } from '../../../app/interfaces/Post';
import IContext from '../../../app/interfaces/Context';

const mockPostModel = jest.mock(
  '../../../app/models/PrismaPostModel',
  jest.fn().mockImplementation(() => ({
    create: async (post: Post, ctx: Context) => generateMockPost({ withId: true }) as Post,
    getOne: async (id: number, payload: IPostUpdate, ctx: IContext) => generateMockPost({ withId: true }) as Post,
    getAll: async () => generateMockPosts(100, { withId: true }) as Post[],
    update: async () => generateMockPost({ withId: true }) as Post,
    deleteOne: async () => generateMockPost({ withId: true }) as Post,
  }))
);

describe('Test User Service', () => {
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  describe('Test Post', () => {
    it('Should return paginated posts', async () => {
      const mockPosts = generateMockPosts(100, { withId: true }) as Post[];
      const mockedPostPage = mockPosts.slice(20, 40);
      const page: number = 2;
      const limit: number = 20;
      const authorId: number = 0;

      const response = await new PostService(mockPostModel).getAll(authorId, page, limit, ctx);
      expect(response).toEqual(mockedPostPage);
      expect(ctx.prisma.post.findMany).toHaveBeenCalledWith({
        where: { limit, skip: (page - 1) * limit },
      });
    });

    it('Should return found post by id', async () => {
      const mockPost = generateMockPost({ withId: true }) as Post;

      const response = await new PostService(mockPostModel).getOne(ctx);
      expect(response).toEqual(mockPost);
    });

    it('Should throw not found error when no post is found by id', async () => {
      const mockId = faker.string.alphanumeric();

      ctx.prisma.post.findFirst(null);

      try {
        const response = await new PostService().getById(mockId, ctx);
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
    });

    it('Should update field and return new post', async () => {
      const mockedPost = generateMockPost({ withId: true }) as Post;
      const mockedPayload = {
        phrase: faker.lorem.paragraphs({ min: 10, max: 255 }),
      };
      const mockedResult = { ...mockedPost, ...mockedPayload };

      ctx.prisma.post.findFirst(mockedPost);
      ctx.prisma.post.update.caller(mockedResult);

      const response = await new PostService().updateOne(
        `${mockedPost.id}`,
        mockedPayload,
        ctx
      );
      expect(response).toEqual(mockedResult);
    });
  });
});
