import { ParamsDictionary, Query, Request } from 'express-serve-static-core';

interface TypedRequest<
  T = {},
  U extends Query = {},
  V extends ParamsDictionary = {}
> extends Request {
  body: T;
  query: U;
  params: V;
}

export default TypedRequest;