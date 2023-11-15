import { z } from 'zod';

export const UserCreateSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: z.string().email()
  })
  .strict();

const create = UserCreateSchema;

export const UserIdSchema = z
  .object({
    id: z.string().min(1),
  })
  .strict();

const getOne = UserIdSchema;

export const UserUpdateSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: z.string().email()
  })
  .strict();

const updateOne = UserUpdateSchema;

export default {
  create,
  getOne,
  updateOne,
};