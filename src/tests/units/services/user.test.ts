import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import LoginService from '../../../app/services/LoginService';
import AuthHelper from '../../../app/helpers/auths/auth';
import { ApplicationError } from '../../../app/helpers/errors/error';
import { generateMockUser, generateMockUserLogin } from '../../shared/user';
import UserService from '../../../app/services/UserService';
import {
  Context,
  MockContext,
  createMockContext,
} from '../../shared/prisma/context';

const mockUser = generateMockUser(null, true);

const mockUserModel = jest.mock(
  '../../../app/models/PrismaUserModel',
  jest.fn().mockImplementation(() => ({
    getOneLogin: async () => mockUser,
  }))
);

describe('Test User Service', () => {
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  describe('Test login', () => {
    it('Should validate user and return generated token', async () => {
      const mockLogin = generateMockUserLogin();
      const mockToken = faker.string.hexadecimal({ length: 36 });

      jest.spyOn(AuthHelper, 'generateToken').mockReturnValue(mockToken);

      const { token } = await new LoginService().login(
        mockLogin.userName,
        mockLogin.password,
        ctx
      );
      expect(token).toEqual({ token: mockToken });
    });

    it('Should throw forbidden error when credentials are wrong', async () => {
      const mockLogin = generateMockUserLogin();
      const mockToken = faker.string.hexadecimal({ length: 36 });

      ctx.prisma.user.findFirst.call(null);

      jest.spyOn(AuthHelper, 'generateToken').mockReturnValue(mockToken);

      try {
        const response = await new LoginService().login(
          mockLogin.userName,
          mockLogin.password,
          ctx
        );
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
    });

    it('Should update field and return new post', async () => {
      const mockedUser = generateMockUser(null, true) as Partial<User>;
      const mockedPayload = { userName: faker.internet.userName() };
      const mockedResult = { ...mockedUser, ...mockedPayload };

      ctx.prisma.post.findFirst.call(mockedUser);
      ctx.prisma.post.update.caller(mockedResult);

      const response = await new UserService().updateOne(
        `${mockedUser.id}`,
        mockedPayload,
        ctx
      );
      expect(response).toEqual(mockedResult);
    });
  });
});
