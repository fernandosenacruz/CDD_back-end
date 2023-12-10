import bcrypt from 'bcrypt';

export default async function encryptPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}