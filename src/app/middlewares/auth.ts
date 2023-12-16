import JWT, { JwtPayload } from 'jsonwebtoken';
import ERRORS from '../helpers/errors/error';
import { IMiddlewareRequestHandler } from '../interfaces/RequestHandler';
import LoginService from '../services/LoginService';
import IContext from '../interfaces/Context';
import { StatusCodes } from 'http-status-codes';

export class LoginMiddeware {
  constructor(
    private ctx: IContext,
    private clientService = new LoginService()
  ) {}

  public validateToken: IMiddlewareRequestHandler = async (req, _res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      throw ERRORS.AUTH.TOKEN_NOT_FOUND;
    }
  
    try {
      const { userName, password } = JWT.decode(authorization) as JwtPayload;
      if (!userName || !password) throw new Error();
  
      const { statusCode } = await this.clientService.login(userName, password, this.ctx);

      if (statusCode !== StatusCodes.OK) throw new Error();
    } catch (e) {
      console.log(e)
      throw ERRORS.AUTH.INVALID_TOKEN;
    }
  
    next();
  };
}


const generateToken = (payload: object) => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw new Error('Please define JWT_SECRET Environment variable');
  }

  return JWT.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export default {
  LoginMiddeware,
  generateToken
};