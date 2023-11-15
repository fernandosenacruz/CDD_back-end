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
    USER_EXISTS: new ApplicationError(
      StatusCodes.CONFLICT,
      'Usuário já cadastrado',
    ),
    NOT_FOUND: new ApplicationError(
      StatusCodes.NOT_FOUND,
      'Usuário não encontrado',
    ),
  },
};

export default ERRORS;