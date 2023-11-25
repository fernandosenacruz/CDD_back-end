import StatusCodes from '../others/StatusCodes';

export class ApplicationError extends Error {
  constructor(
    public statusCode: StatusCodes,
    public message: string,
  ) {
    super();
  }
}

const ERRORS = {
  USER: {
    EMAIL_EXISTS: new ApplicationError(
      StatusCodes.CONFLICT,
      'Email já cadastrado',
    ),
    NOT_FOUND: new ApplicationError(
      StatusCodes.NOT_FOUND,
      'Usuário não encontrado',
    ),
  },
  POST: {
    NOT_FOUND: new ApplicationError(
      StatusCodes.NOT_FOUND,
      'Post não encontrado',
    ),
  },
  AUTH: {
    TOKEN_NOT_FOUND: new ApplicationError(
      StatusCodes.BAD_REQUEST,
      'Token not found',
    ),
    INVALID_TOKEN: new ApplicationError(
      StatusCodes.FORBIDDEN,
      'Invalid token',
    ),
  },
};

export default ERRORS;