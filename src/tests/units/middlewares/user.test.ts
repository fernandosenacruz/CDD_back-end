import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ZodError } from 'zod';
import UserMiddleware from '../../../app/middlewares/user';
import { generateMockUser, generateMockUserLogin } from '../../shared/user';

describe('Test User Middleware', () => {
  let req: Request;
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
    req = getMockReq();
  });

  describe('Test validateLogin', () => {
    const loginMock = generateMockUserLogin();

    it('Should correctly validate request', () => {
      req.body = loginMock;

      UserMiddleware.validateLogin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should throw error for invalid fields', () => {
      const userMock = generateMockUser();
      req.body = userMock;

      try {
        UserMiddleware.validateLogin(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ZodError);
      }
      expect(next).not.toHaveBeenCalled();
    });
  });
});