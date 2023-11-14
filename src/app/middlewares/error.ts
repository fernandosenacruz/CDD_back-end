import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  console.log(err);
  return res.status;
};

export default errorMiddleware;