import { User } from '@prisma/client';
import { PaginationResult } from 'prisma-paginate/dist/pagination/result/PaginationResult';
import { z } from 'zod';

import StatusCodes from '../helpers/others/StatusCodes';

import { UserCreateSchema, UserUpdateSchema } from '../schemas/users';
import { PostCreate } from '../../tests/shared/post';

type IUserCreate = z.infer<typeof UserCreateSchema>;
type IUserUpdate = z.infer<typeof UserUpdateSchema>;

interface IUserResponse {
  user?:      Partial<User> | null;
  message:    string;
  statusCode: StatusCodes;
}

interface ILoginResponse extends IUserResponse {
  token: string;
};

interface IUsersResponse {
  users:      PaginationResult;
  message:    string;
  statusCode: StatusCodes;
}

interface IUserWithPosts {
  id: number;
  name: string;
  email: string;
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: PostCreate[] | null;
}

export {
  IUserResponse,
  IUsersResponse,
  ILoginResponse,
  IUserCreate,
  IUserUpdate,
  IUserWithPosts
};