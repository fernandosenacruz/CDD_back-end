import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import StatusCodes from '../helpers/others/StatusCodes';
import { TypedResponse } from '../interfaces';

interface ErrorResponse {
  statusCode: StatusCodes;
  message: string;
}

const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
): TypedResponse<ErrorResponse> => {
  if (err instanceof ZodError) {
    const zodError = err.issues[0];

    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: `${zodError.path[zodError.path.length - 1]}
       - ${zodError.message}`,
    });
  }

  if (err.statusCode || err.message) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something worng doesn't rigth!",
  });
};

export default errorMiddleware;
