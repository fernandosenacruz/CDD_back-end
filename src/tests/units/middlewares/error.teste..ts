import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import errorMiddleware from '../../../app/middlewares/error';
import { generateZodError, generateApplicationError } from '../../shared/error';

describe('Test Error Middleware', () => {
  let req: Request;
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
    req = getMockReq();
  });

  it('Handles zodError and return formatted response', () => {
    const zodError = generateZodError();

    errorMiddleware(zodError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });

  it('Handles ApplicationError and return expected response', () => {
    const applicationError = generateApplicationError();

    errorMiddleware(applicationError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(applicationError.statusCode);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: applicationError.message,
      })
    );
  });

  it('Handles unexpected error and return internal error response', () => {
    const unexpectedError = new Error('Unexpected error!');

    errorMiddleware(unexpectedError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
