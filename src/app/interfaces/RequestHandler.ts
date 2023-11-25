import { Request, Response, NextFunction } from 'express-serve-static-core';
import Context from './Context';

type IControllerRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  ctx: Context,
) => Promise<void>;

type IMiddlewareRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export {
  IControllerRequestHandler,
  IMiddlewareRequestHandler,
};