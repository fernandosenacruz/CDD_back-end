import md5 from 'md5';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient, User } from '@prisma/client';
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
      const userMock = generateMockUser(loginMock, { withId: false }) as User;
      
      await prisma.user.create({ data: { ...userMock, password: md5(userMock.password) } });

      const response = await loginRequest(loginMock);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject({
        token: expect.any(String),
      });
    });

    it('Should return forbidden error for non-existent user', async () => {
      const loginMock = generateMockUserLogin();
     
      const response = await loginRequest(loginMock);
     
      expect(response.status).toBe(StatusCodes.FORBIDDEN);
      expect(response.body).toMatchObject({
         error: ERRORS.USER.WRONG_PASSWORD,
      });
     });
     
     it('Should return forbidden error for invalid credentials', async () => {
       const loginMock = generateMockUserLogin();
       const invalidLogin = { ...loginMock, password: 'invalidPassword' };
      
       const response = await loginRequest(invalidLogin);
      
       expect(response.status).toBe(StatusCodes.FORBIDDEN);
       expect(response.body).toMatchObject({
          error: ERRORS.USER.WRONG_PASSWORD,
       });
      });
    });

});
