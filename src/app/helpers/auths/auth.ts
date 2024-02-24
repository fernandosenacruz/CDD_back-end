import md5 from 'md5';
import JWT, { JwtPayload } from 'jsonwebtoken';
import { ERRORS } from '../errors/error';

const encryptPassword = (password: string) => md5(password);

const generateToken = (payload: object) => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw new Error('Please define JWT_SECRET Environment variable');
  }

  return JWT.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

const validateToken = (token: string) => {
  try {
    const { username, password } = JWT.decode(token) as JwtPayload;
    if (!username || !password) {
      throw Error();
    }
  } catch (err) {
    throw ERRORS.AUTH.INVALID_TOKEN;
  }
};

export default {
  encryptPassword,
  generateToken,
  validateToken,
};
