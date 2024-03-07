import { Post } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type PostCreate = Optional<Post, 'id'>;

interface MockPostProps {
  withId: boolean;
}

const generateMockPost = (props?: MockPostProps): PostCreate => {
  const { withId } = props || {};

  const post: PostCreate = {
    phrase: faker.lorem.paragraphs(1),
    published: faker.datatype.boolean({ probability: 0.1 }),
    authorId: faker.number.int({ min: 1, max: 999 }),
    imgURL: faker.internet.url(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  if (withId) post.id = faker.number.int({ min: 1, max: 999 });
  return post;
};

const generateMockPostsPaginate = (quantity: number, props?: MockPostProps) => {
  return {
    result: Array(quantity).fill(generateMockPost(props)) as unknown as Post[],
    totalPages: faker.number.int({ min: 1, max: 10 }),
    hasNextPage: faker.datatype.boolean(),
    hasPrevPage: faker.datatype.boolean(),
    count: faker.number.int({ min: 1, max: 99 }),
    nextPage: (): any => {},
    exceedCount: faker.datatype.boolean(),
    exceedTotalPages: faker.datatype.boolean(),
  };
};

const generateMockPosts = (
  quantity: number,
  props: MockPostProps = { withId: false }
): PostCreate[] => Array(quantity).fill(generateMockPost(props));

export { generateMockPost, generateMockPosts, generateMockPostsPaginate };
