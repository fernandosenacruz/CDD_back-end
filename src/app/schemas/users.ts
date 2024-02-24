import { z } from 'zod';

export const UserCreateSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    userName: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(15, 'Username must be at most 15 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .strict();

const create = UserCreateSchema;
export type userCreateSchema = z.infer<typeof UserCreateSchema>;

export const UserIdSchema = z
  .object({
    id: z.string().min(1),
  })
  .strict();

const getOne = UserIdSchema;

export const UserUpdateSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be at most 50 characters long')
      .optional(),
    email: z.string().email('Invalid email address').optional(),
    userName: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(15, 'Username must be at most 15 characters long')
      .optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
  });

const updateOne = UserUpdateSchema;
export type userUpdateSchema = z.infer<typeof UserUpdateSchema>;

export const UserLoginSchema = z.
  object({
    userName: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(15, 'Username must be at most 15 characters long'),
    password: z.
      string()
      .min(6, 'Password must be at least 6 characters long')
      .max(8, 'Password must be at most 8 characters long'),
  })
  .strict();

const login = UserLoginSchema;
export type userLoginSchema = z.infer<typeof UserLoginSchema>;

export default {
  create,
  getOne,
  updateOne,
  login
};