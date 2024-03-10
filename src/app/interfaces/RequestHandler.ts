import { Request, Response, NextFunction } from 'express-serve-static-core';
import { IContext } from './Context';

type IControllerRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  ctx: IContext,
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