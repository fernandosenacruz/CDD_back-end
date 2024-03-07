import MESSAGES from '../../../app/helpers/others/messages';
import UserService from '../../../app/services/UserService';
import LoginService from '../../../app/services/LoginService';
import StatusCodes from '../../../app/helpers/others/StatusCodes';
import AuthHelper from '../../../app/helpers/auths/auth';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PaginationResult } from 'prisma-paginate';
import { ApplicationError } from '../../../app/helpers/errors/error';
import { IUserResponse, IUsersResponse } from '../../../app/interfaces/User';
import {
  generateMockUser,
  generateMockUserLogin,
  generateMockUsersPaginate,
} from '../../shared/user';
import {
  Context,
  MockContext,
  createMockContext,
} from '../../shared/prisma/context';

describe('Test User Service', () => {
  let mockCtx: MockContext;
  let ctx: Context;
  const mockUserModel = {
    create: jest.fn(),
    getOne: jest.fn(),
    getOneLogin: jest.fn(),
    getAll: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  jest.mock('../../../app/helpers/auths/auth');

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  afterEach(() => {
    jest.clearAllMocks();
   });
  
  describe('Test login', () => {
    it('Should validate user and return generated token', async () => {
      const mockLogin = generateMockUserLogin();
      const mockToken = faker.string.hexadecimal({ length: 36 });

      mockUserModel.getOneLogin.mockResolvedValue(mockLogin);
      (AuthHelper.generateToken as jest.Mock).mockReturnValue(mockToken); 

      const loginService = new LoginService(mockUserModel);
      const result = await loginService.login(
          mockLogin.userName,
          mockLogin.password,
          ctx
      );
      expect(result).toEqual({
        message: MESSAGES.USERS.FOUND,
        statusCode: StatusCodes.OK,
        user: mockLogin,
        token: mockToken,
     });
    });

    it('Should throw forbidden error when credentials are wrong', async () => {
      const mockLogin = generateMockUserLogin();
      const notFoundError = new ApplicationError(StatusCodes.NOT_FOUND, MESSAGES.USERS.WRONG_PASSWORD);
      mockUserModel.getOneLogin.mockRejectedValue(notFoundError);

      try {
        const response = await new LoginService(mockUserModel).login(
          mockLogin.userName,
          mockLogin.password,
          ctx
        );
        expect(response).toBeUndefined();
      } catch (e) {
        const error = e as ApplicationError;
        expect(error).toBeInstanceOf(ApplicationError);
        expect(error.message).toEqual(MESSAGES.USERS.WRONG_PASSWORD);
        expect(error.statusCode).toEqual(StatusCodes.NOT_FOUND);
      }
    });

    it('Should return paginated users', async () => {
      const mockUsers = generateMockUsersPaginate(10, {
        withId: true,
      }) as PaginationResult;
      const page: number = 1;
      const limit: number = 10;
      const mockResponse: IUsersResponse = {
        users: mockUsers,
        message: MESSAGES.USERS.FOUNDS,
        statusCode: StatusCodes.OK,
      };

      mockUserModel.getAll.mockResolvedValue(mockUsers);
      const response = await new UserService(mockUserModel).getAll(
        page,
        limit,
        ctx
      );
      expect(response).toEqual(mockResponse);
    });

    it('Should return found post by id', async () => {
      const mockUser = generateMockUser(null, { withId: true }) as User;
      const withPosts: boolean = false;
      const published: boolean = false;
      const mockResponse: IUserResponse = { 
        user: mockUser,
        message: MESSAGES.USERS.FOUND,
        statusCode: StatusCodes.OK
      };
  
      mockUserModel.getOne.mockResolvedValue(mockUser);
      const response = await new UserService(mockUserModel).getById(`${mockUser.id}`, withPosts, published, ctx);
      expect(response).toEqual(mockResponse);
    });

    it('Should update field and return new user', async () => {
      const mockedUser = generateMockUser(null, {
        withId: true,
      }) as Partial<User>;
      const mockedPayload = { userName: faker.internet.userName() };

      mockUserModel.getOne.mockResolvedValue(mockedUser);
      mockUserModel.updateOne.mockResolvedValue(mockedUser);

      const response = await new UserService(mockUserModel).updateOne(
        `${mockedUser.id}`,
        mockedPayload,
        ctx
      );

      mockedUser.userName = mockedPayload.userName;
      const mockResponse: IUserResponse = {
        user: mockedUser,
        message: MESSAGES.USERS.UPDATAED,
        statusCode: StatusCodes.OK,
      };

      expect(response).toEqual(mockResponse);
    });
  });
});
