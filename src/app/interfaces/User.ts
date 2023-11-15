import { User } from '@prisma/client';
import { IPost } from './Post';
import { z } from 'zod';

import StatusCodes from '../helpers/others/StatusCodes';

import { UserCreateSchema, UserUpdateSchema } from '../schemas/users';

type IUserCreate = z.infer<typeof UserCreateSchema>;
type IUserUpdate = z.infer<typeof UserUpdateSchema>;

interface IUser {
  name:  string;
  email: string;
  post?:  IPost[];
}

interface UserResponse {
  user?:      User | null;
  message:    string;
  statusCode: StatusCodes;
}

interface IUsersResponse {
  users:      IUser[];
  message:    string;
  statusCode: StatusCodes;
}

export {
  IUser,
  UserResponse,
  IUsersResponse,
  IUserCreate,
  IUserUpdate
};