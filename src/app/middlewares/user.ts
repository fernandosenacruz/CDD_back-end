import { RequestHandler } from 'express';

import { UserSchema } from '../schemas';

const validateCreate: RequestHandler = (req, _res, next) => {
  UserSchema.create.parse(req.body);

  next();
};

const validateUpdate: RequestHandler = (req, _res, next) => {
  UserSchema.updateOne.parse(req.body);

  next();
};

export default {
  validateCreate,
  validateUpdate,
};