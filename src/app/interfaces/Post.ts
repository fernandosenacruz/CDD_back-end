import { Post } from '@prisma/client';
import { PaginationResult } from 'prisma-paginate/dist/pagination/result/PaginationResult';
import { z } from 'zod';

import StatusCodes from '../helpers/others/StatusCodes';

import { PostCreateSchema, PostUpdateSchema } from '../schemas/posts';

type IPostCreate = z.infer<typeof PostCreateSchema>;
type IPostUpdate = z.infer<typeof PostUpdateSchema>;

interface IPost {
  phrase:     string;
  imgURL?:    string;
  createdAt?: Date ;
  authorId:   number;
}

interface IValidatedPost {
  published: boolean;
}

interface IPostResponse {
  post?:      Post | null;
  message:    string;
  statusCode: StatusCodes;
}

interface IPostsResponse {
  posts:      PaginationResult;
  message:    string;
  statusCode: StatusCodes;
}

export {
  IPost,
  IPostResponse,
  IPostsResponse,
  IPostCreate,
  IPostUpdate,
  IValidatedPost,
};