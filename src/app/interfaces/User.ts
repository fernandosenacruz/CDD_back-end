import { User } from '@prisma/client';
import { z } from 'zod';

import StatusCodes from '../helpers/others/StatusCodes';

import { UserCreateSchema, UserUpdateSchema } from '../schemas/users';

type IUserCreate = z.infer<typeof UserCreateSchema>;
type IUserUpdate = z.infer<typeof UserUpdateSchema>;

interface IUserResponse {
  user?:      Partial<User> | null;
  message:    string;
  statusCode: StatusCodes;
}

interface IUsersResponse {
  users:      Partial<User>[];
  message:    string;
  statusCode: StatusCodes;
}

export {
  IUserResponse,
  IUsersResponse,
  IUserCreate,
  IUserUpdate
};