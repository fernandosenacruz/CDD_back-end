import { ZodError, ZodObject} from 'zod';
import { faker } from '@faker-js/faker';
import UserSchema from '../../app/schemas/users';
import { ERRORS, ApplicationError } from '../../app/helpers/errors/error';

const generateZodError = (
  object?: object,
  schemaToParse?: ZodObject<any>,
) => {
  if (object && schemaToParse) {
    const { error } = schemaToParse.parse(object);
    return error;
  }

  const invalidUser = { 
    userName: faker.internet.userName(),
    password: faker.internet.password({ length: 40, memorable: false }) 
  };
  
  try {
    UserSchema.login.parse(invalidUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.message;
    }
  }
};

const generateApplicationError = (error?: ApplicationError) => (
  error || ERRORS.USER.NOT_FOUND
);

export {
  generateZodError,
  generateApplicationError,
};