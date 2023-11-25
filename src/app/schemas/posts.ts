import { z } from 'zod';

export const PostCreateSchema = z
  .object({
    phrase: z.string().min(10).max(255),
    imgURL: z.string().optional(),
    authorId: z.number(),
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
    imgURL: z.string().optional(),
    authorId: z.number(),
  })
  .strict();

const updateOne = PostUpdateSchema;

export default {
  create,
  getOne,
  updateOne,
};