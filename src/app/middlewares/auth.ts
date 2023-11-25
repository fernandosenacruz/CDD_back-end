import JWT, { JwtPayload } from 'jsonwebtoken';
import ERRORS from '../helpers/errors/error';
import { IMiddlewareRequestHandler } from '../interfaces/RequestHandler';

const validateToken: IMiddlewareRequestHandler = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw ERRORS.AUTH.TOKEN_NOT_FOUND;
  }

  try {
    const { username, password } = JWT.decode(authorization) as JwtPayload;

    if (!username || !password) throw new Error();
  } catch (e) {
    throw ERRORS.AUTH.INVALID_TOKEN;
  }

  next();
};

export default {
  validateToken,
};