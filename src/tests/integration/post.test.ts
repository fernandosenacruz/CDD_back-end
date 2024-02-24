import JWT from 'jsonwebtoken';
import requester from './utilities/requester';
import { StatusCodes } from 'http-status-codes';
import { Post, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { generateMockUserLogin } from '../shared/user';
import { PaginationResult } from 'prisma-paginate';
import {
  PostCreate,
  generateMockPost,
  generateMockPosts,
  generateMockPostsPaginate,
} from '../shared/post';


const prisma = new PrismaClient();

describe('Test post Routes', () => {
  let token: string;

  const createPosts = (posts: PostCreate[]) => (
    prisma.post.createMany({ data: posts })
  );

  const generateToken = () => {
    const user = generateMockUserLogin();
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) throw new Error('Please define JWT_SECRET Environment variable');

    return JWT.sign(user, JWT_SECRET);
  };

  beforeEach(async () => {
    await prisma.post.deleteMany();
    token = generateToken();
  });

  afterAll(() => requester.close());

  describe('Test GET /posts', () => {
    it('Should return posts filtered by author', async () => {
      const { result } = generateMockPostsPaginate(10);
      const expectedBody = result.filter(
        ({ authorId }) => authorId === result[0].authorId,
      );

      await createPosts(result);

      const response = await requester
        .get(`/posts/:authorId`)
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(PaginationResult);
      const expectPromises = response.body.map((post: Post, idx: number) => (
        expect(post).toEqual(expect.objectContaining(expectedBody[idx]))
      ));

      await Promise.all(expectPromises);
    });
  });

  describe('Test GET /posts/:id', () => {
    it('Should return post by valid id', async () => {
      const mockedPosts = generateMockPosts(10);

      await createPosts(mockedPosts);
      const dbPosts = await prisma.post.findMany();

      const response = await requester
        .get(`/posts/${dbPosts[10].id}`)
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(dbPosts[10]);
    });

    it('Should return not found error in case of nonexistent id', async () => {
      const response = await requester
        .get('/post/0')
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Test PATCH /post/:id', () => {
    const mockedPayload = { imgURL: faker.internet.url() };

    beforeEach(async () => {
      const mockedPosts = generateMockPosts(10);
      await createPosts(mockedPosts);
    });

    it('Should update and return updated post', async () => {
      const dbPosts = await prisma.post.findMany();

      const response = await requester
        .patch(`/posts/${dbPosts[5].id}`)
        .set('Authorization', token)
        .send(mockedPayload);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(
        { ...dbPosts[5], ...mockedPayload },
      );

      const updatedPost = await prisma.post.findUnique(
        { where: { id: dbPosts[5].id } },
      );
      expect(updatedPost).toBeDefined();
      expect(updatedPost?.imgURL).toBe(mockedPayload.imgURL);
    });

    it('Should return not found error in case of nonexistent id', async () => {
      const response = await requester
        .patch('/posts/0')
        .set('Authorization', token)
        .send(mockedPayload);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty('error');
    });

    it('Should return bad request error in case of invalid id', async () => {
      const mockWord = faker.word.words();

      const response = await requester
        .patch(`/posts/${mockWord}`)
        .set('Authorization', token)
        .send(mockedPayload);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty('error');
    });

    it('Should return bad request error in case of invalid body', async () => {
      const mockId: number = 5;
      const dbPosts = await prisma.post.findMany();

      const response = await requester
        .patch(`/posts/${dbPosts[5].id}`)
        .set('Authorization', token)
        .send({ id: mockId });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty('error');
    });
  });
});
