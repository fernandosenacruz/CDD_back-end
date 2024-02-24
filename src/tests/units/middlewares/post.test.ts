import { ZodError } from 'zod';
import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import PostMiddleware from '../../../app/middlewares/post';
import { generateMockPost } from '../../shared/post';

describe('Test Post Middleware', () => {
  let req: Request;
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
    req = getMockReq();
  });

  describe('Test validateCreate', () => {
    it('Should correctly validate a new post', () => {
      const { phrase, imgURL } = generateMockPost({ withId: false });
      req.body = { phrase, imgURL };

      PostMiddleware.validateCreate(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should not validate an invalid post', () => {
      const mockPost = generateMockPost({ withId: false });
      mockPost.phrase = '';
      req.body = {
        phrase: mockPost.phrase,
        authorId: mockPost.authorId,
        imgURL: mockPost.imgURL,
      };

      try {
        PostMiddleware.validateCreate(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ZodError);
      }
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Test validateUpdate', () => {
    it('Should correctly validate an existing post', () => {
      const { id, phrase, authorId, imgURL } = generateMockPost({
        withId: true,
      });
      req.params = { id: id.toString() };
      req.body = { phrase, authorId, imgURL };

      PostMiddleware.validateUpdate(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should not validate an invalid post', () => {
      const { phrase, authorId, imgURL } = generateMockPost({ withId: true });
      req.body = { phrase, authorId, imgURL };

      try {
        PostMiddleware.validateCreate(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ZodError);
      }
      expect(next).not.toHaveBeenCalled();
    });
  });
});
