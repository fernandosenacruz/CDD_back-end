import { faker } from '@faker-js/faker/locale/pt_BR';
import { Post } from '@prisma/client';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type PostCreate = Optional<Post, 'id'>;

interface MockPostProps {
  withId: boolean
}

const generateMockPost = (props?: MockPostProps): PostCreate => {
  const { withId } = props || {};

  const post: PostCreate = {
    phrase: faker.lorem.paragraphs(20),
    published: faker.datatype.boolean({ probability: 0.1 }),
    authorId: faker.number.int({ min: 1 }),
    imgURL: faker.internet.url(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  if (withId) post.id = faker.number.int({ min: 999 });
  return post;
};

const generateMockPosts = (
  quantity: number,
  props: MockPostProps = { withId: false },
): PostCreate[] => (
  Array(quantity).fill(generateMockPost(props))
);

export {
  generateMockPost,
  generateMockPosts
};