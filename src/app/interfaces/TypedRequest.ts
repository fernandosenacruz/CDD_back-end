import { ParamsDictionary, Query, Request } from 'express-serve-static-core';

export interface TypedRequest<
  T = {},
  U extends Query = {},
  V extends ParamsDictionary = {}
> extends Request {
  body: T;
  query: U;
  params: V;
}
