import StatusCodes from '../others/StatusCodes';
import MESSAGES from '../others/messages';

export class ApplicationError extends Error {
  constructor(public statusCode: StatusCodes, public message: string) {
    super();
  }
}

export const ERRORS = {
  USER: {
    EMAIL_EXISTS: new ApplicationError(
      StatusCodes.CONFLICT,
      MESSAGES.USERS.USER_EXISTS
    ),
    NOT_FOUND: new ApplicationError(
      StatusCodes.NOT_FOUND,
      MESSAGES.USERS.NOT_FOUND
    ),
    WRONG_PASSWORD: new ApplicationError(
      StatusCodes.UNAUTHORIZED,
      MESSAGES.USERS.WRONG_PASSWORD
    ),
  },
  POST: {
    NOT_FOUND: new ApplicationError(
      StatusCodes.NOT_FOUND,
      MESSAGES.POSTS.NOT_FOUND
    ),
  },
  AUTH: {
    TOKEN_NOT_FOUND: new ApplicationError(
      StatusCodes.BAD_REQUEST,
      MESSAGES.TOKEN.NOT_FOUND
    ),
    INVALID_TOKEN: new ApplicationError(
      StatusCodes.UNAUTHORIZED,
      MESSAGES.TOKEN.INVALID
    ),
  },
};
