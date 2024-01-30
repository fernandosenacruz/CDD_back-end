import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ApplicationError } from '../../../app/helpers/errors/error';
import { LoginMiddeware } from '../../../app/middlewares/auth';
import { MockContext, Context, createMockContext } from '../../shared/prisma/context';

describe('Test Authentication Middleware', () => {
  let req: Request;
  let mockCtx: MockContext;
  let ctx: Context;
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
    req = getMockReq();
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  describe('Test validateToken', () => {
    const tokenMock = faker.string.hexadecimal({ length: 36 });

    it('Should correctly validate token', async () => {
      req.headers.authorization = tokenMock;

      jest.spyOn(JWT, 'decode').mockReturnValue({
        username: faker.internet.userName(),
        password: faker.internet.password({ length: 8 }),
      });
      
      new LoginMiddeware(ctx).validateToken(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should throw error for unexistent token', async () => {
      try {
        new LoginMiddeware(ctx).validateToken(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
      expect(next).not.toHaveBeenCalled();
    });

    it('Should throw error for invalid token', async () => {
      jest.spyOn(JWT, 'verify').mockImplementation(() => {
        throw new Error();
      });

      try {
        new LoginMiddeware(ctx).validateToken(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
      expect(next).not.toHaveBeenCalled();
    });
  });
});