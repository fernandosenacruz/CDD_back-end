import StatusCodes from '../../../app/helpers/others/StatusCodes';
import UserController from '../../../app/controllers/UserController';
import { TypedRequest } from '../../../app/interfaces';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { generateMockUser, generateMockUserLogin, generateMockUsersPaginate } from '../../shared/user';
import { ApplicationError, ERRORS } from '../../../app/helpers/errors/error';
import {
  Context,
  MockContext,
  createMockContext,
} from '../../shared/prisma/context';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

describe('Test User Controller', () => {
  let req: TypedRequest<any, any, { id: string }>;
  const { res, next, mockClear } = getMockRes();
  let mockCtx: MockContext;
  let ctx: Context;

  const mockUserService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    getByLogin: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(() => {
    mockClear();
    req = getMockReq();
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    jest.mock('../../../app/services/UserService', () => mockUserService);
  });

  describe('Test create', () => {
    it('Should return a new user', async () => {
      const mockLogin = generateMockUserLogin();
      const mockUser = generateMockUser(mockLogin, { withId: true, withPosts: false }) as User;

      mockUserService.create.mockResolvedValue(mockUser);

      const userController = new UserController(ctx, mockUserService);

      req.body = {
        name: mockUser.name,
        email: mockUser.email,
        userName: mockLogin.userName,
        password: mockLogin.password,
      };

      const response = await userController.create(req, res, next);

      expect(response.json).toEqual(mockUser);
    });

    it('Should return an error if user already exists', async () => {
      const existsError = ERRORS.USER.EMAIL_EXISTS;
      mockUserService.create.mockRejectedValue(existsError);

      try {
        new UserController(ctx, mockUserService).create(req, res, next);
      } catch (error) {
        const e = error as ApplicationError;
        expect(e.message).toEqual(existsError.message);
        expect(e.statusCode).toEqual(StatusCodes.CONFLICT);
      }
    });
  });

  describe('Test getAll', () => {
    it('Should return all users', async () => {
      const mockUsers = generateMockUsersPaginate(10, { withId: true, withPosts: false });
      const page: number = 1, limit: number = 10;
      req.query = { page, limit };

      mockUserService.getAll.mockResolvedValue(mockUsers);

      const userController = new UserController(ctx, mockUserService);
      const response = await userController.getAll(req, res, next);

      expect(response.json).toEqual(mockUsers);
    });
  });

  describe('Test getById', () => {
    it('Should return a user', async () => {
      const mockUser = generateMockUser(null, { withId: true, withPosts: false }) as User;

      mockUserService.getById.mockResolvedValue(mockUser);

      const userController = new UserController(ctx, mockUserService);
      const response = await userController.getById(req, res, next);

      expect(response.json).toEqual(mockUser);
    });

    it('Should return an error if user not found', async () => {
      const notFoundError = ERRORS.USER.NOT_FOUND;
      mockUserService.getById.mockRejectedValue(notFoundError);

      try {
        new UserController(ctx, mockUserService).getById(req, res, next);
      } catch (error) {
        const e = error as ApplicationError;
        expect(e.message).toEqual(notFoundError.message);
        expect(e.statusCode).toEqual(StatusCodes.NOT_FOUND);
      }
    });
  });

  describe('Test update', () => {
    it('Should update field and return new user', async () => {
      const mockUser = generateMockUser(null, { withId: true, withPosts: false }) as Partial<User>;
      const mockPayload = { email: faker.internet.email() };

      mockUserService.getByLogin.mockResolvedValue(mockUser);
      mockUserService.updateOne.mockResolvedValue(mockUser);

      req.params = { id: `${mockUser.id}` };
      req.body = mockPayload;

      const userController = new UserController(ctx, mockUserService);
      const response = await userController.updateOne(req, res, next);

      expect(response.json).toEqual(mockUser);
    });
  });
});
