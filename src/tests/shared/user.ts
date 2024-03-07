import { Optional } from './post';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

export type UserLogin = Pick<User, 'userName' | 'password'>;

export type UserCreate = Optional<User, 'id'>;

interface MockUserProps {
  withId: boolean;
}

const generateMockUserLogin = (): UserLogin => ({
  userName: faker.internet.userName(),
  password: faker.internet.password({ length: 8 }),
});

const generateMockUser = (
  userLogin?: UserLogin,
  props?: MockUserProps
): Partial<User> => {
  const { withId } = props || {};

  const userNameAndPassword = userLogin || generateMockUserLogin();
  const user: Partial<User> = {
    userName: userNameAndPassword.userName,
    password: userNameAndPassword.password,
  };

  if (withId) user.id = faker.number.int({ min: 1, max: 999 });

  return user;
};

const generateMockUsersPaginate = (quantity: number, props?: MockUserProps) => {
  return {
    result: Array(quantity).fill(
      generateMockUser(null, props)
    ) as unknown as User[],
    totalPages: faker.number.int({ min: 1, max: 10 }),
    hasNextPage: faker.datatype.boolean(),
    hasPrevPage: faker.datatype.boolean(),
    count: faker.number.int({ min: 1, max: 99 }),
    nextPage: (): any => {},
    exceedCount: faker.datatype.boolean(),
    exceedTotalPages: faker.datatype.boolean(),
  };
};

const generateMockUsers = (
  quantity: number,
  props: MockUserProps = { withId: false }
): UserCreate[] => Array(quantity).fill(generateMockUser(null, props));

export {
  generateMockUser,
  generateMockUsers,
  generateMockUserLogin,
  generateMockUsersPaginate,
};
