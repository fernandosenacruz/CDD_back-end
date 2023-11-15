import { z } from 'zod';

export const PostCreateSchema = z
  .object({
    phrase: z.string().min(10).max(255),
    imgURL: z.string() || z.undefined,
    authorId: z.number(),
    published: z.boolean(),
  })
  .strict();

const create = PostCreateSchema;

export const PostIdSchema = z
  .object({
    id: z.string().min(1),
  })
  .strict();

const getOne = PostIdSchema;

export const PostUpdateSchema = z
  .object({
    phrase: z.string().min(10).max(255),
    imgURL: z.string() || z.undefined,
    authorId: z.number(),
    published: z.boolean(),
  })
  .strict();

const updateOne = PostUpdateSchema;

export default {
  create,
  getOne,
  updateOne,
};