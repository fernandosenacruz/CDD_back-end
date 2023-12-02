import { z } from 'zod';

export const UserCreateSchema = z
  .object({
    name: z.string().min(3).max(50),
    userName: z.string().min(3).max(15),
    email: z.string().email(),
    password: z.string().min(6),
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
    name: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    userName: z.string().min(3).max(15).optional(),
    password: z.string().min(6).optional(),
  });

const updateOne = UserUpdateSchema;

export const UserLoginSchema = z.
  object({
    userName: z.string().min(3).max(15),
    password: z.string().min(6),
  })
  .strict();

const login = UserLoginSchema;

export default {
  create,
  getOne,
  updateOne,
  login
};