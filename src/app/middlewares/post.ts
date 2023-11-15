import { RequestHandler } from 'express';

import { PostSchema } from '../schemas';

const validateCreate: RequestHandler = (req, _res, next) => {
  PostSchema.create.parse(req.body);

  next();
};

const validateUpdate: RequestHandler = (req, _res, next) => {
  PostSchema.updateOne.parse(req.body);

  next();
};

export default {
  validateCreate,
  validateUpdate,
};