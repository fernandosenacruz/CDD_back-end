import { faker } from '@faker-js/faker/locale/pt_BR';
import { User } from '@prisma/client';

export type UserLogin = Pick<User, 'userName' | 'password'>;

const generateMockUserLogin = (): UserLogin => ({
  userName: faker.internet.userName(),
  password: faker.internet.password({ length: 8 }),
});

const generateMockUser = (userLogin?: UserLogin, withId?: boolean): Partial<User> => {
  const userNameAndPassword = userLogin || generateMockUserLogin();
  const user: Partial<User> = {
    userName: userNameAndPassword.userName,
    password: userNameAndPassword.password,
  };

  if (withId) user.id = faker.number.int({ min: 999 });
  
  return user;
};

export {
  generateMockUser,
  generateMockUserLogin,
};