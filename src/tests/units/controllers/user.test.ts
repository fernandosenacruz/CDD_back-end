import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';
import Controller from '../../../app/controllers';
import LoginService from '../../../app/services/LoginService';
import { MockContext, createMockContext } from '../../shared/prisma/context';
import { generateApplicationError } from '../../shared/error';
import { generateMockUserLogin } from '../../shared/user';
import { ERRORS } from '../../../app/helpers/errors/error';
import { TypedRequest } from '../../../app/interfaces';

jest.mock('../../../app/services/LoginService');

// describe('Test User Controller', () => {
//   let req: TypedRequest<any, any, { id: string }>;
//   const { res, next, mockClear } = getMockRes();
//   let ctx: MockContext;

//   beforeEach(() => {
//     mockClear();
//     req = getMockReq();
//     ctx = createMockContext();
//   });

//   describe('Test login', () => {
//     const mockRequest = () => {
//       const { userName, password } = generateMockUserLogin();
//       return { userName, password };
//     };

//     it('Should respond with token when login is successful', async () => {
//       const tokenMock = faker.string.hexadecimal({ length: 36 });
//       const { userName, password } = mockRequest();
//       req.params = { id: faker.string.alphanumeric() }; 

//       const user = jest.fn().mockImplementation(() => {
//         return {
//           getById: () => {
//             return {
//               token: tokenMock,
//               userName,
//               password,
//             }
//           }
//         }
//       });

//       await new Controller.UserController(ctx, user).getById(req, res, next);

//       expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//       expect(res.json).toHaveBeenCalledWith({ token: tokenMock });
//     });

//     it('should throw exception when service throws an error', async () => {
//       const applicationError = generateApplicationError(ERRORS.USER.INVALID_CREDENTIALS);
//       const { userName, password } = mockRequest();

//       jest.fn().mockImplementation(() => {
//         return {
//           userName,
//           password,
//         }
//       });

//       try {
//         const response = await new LoginService().login(userName, password, ctx);
//         await new Controller.UserCrontroller(ctx, user).getById(response.user.id, response, next);
//         expect(response).toBeUndefined();
//       } catch (e) {
//         expect(e).toBe(applicationError);
//       }
//     });
//   });
// });
