import md5 from 'md5';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import requester from './utilities/requester';
import { ERRORS } from '../../app/helpers/errors/error';
import {
  generateMockUser,
  generateMockUserLogin,
  UserLogin,
} from '../shared/user';

const prisma = new PrismaClient();

describe('Test User Routes', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(() => requester.close());

  describe('Test POST /login', () => {
    const loginRequest = (user: UserLogin) =>
      requester.post('/login').send(user);

    it('Should return token when user exists', async () => {
      const loginMock = generateMockUserLogin();
      const userMock = generateMockUser(loginMock);

      await prisma.user.create({
        ...userMock,
        password: md5(userMock.password, 'utf8'),
      });

      const response = await loginRequest(loginMock);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject({
        token: expect.any(String),
      });
    });

    it('Should return forbidden error for invalid credentials', async () => {
      const loginMock = generateMockUserLogin();

      const response = await loginRequest(loginMock);

      expect(response.status).toBe(StatusCodes.FORBIDDEN);
      expect(response.body).toMatchObject({
        error: ERRORS.USER.WORG_PASSWORD,
      });
    });
  });
});
