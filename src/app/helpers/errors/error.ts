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
};

export default ERRORS;