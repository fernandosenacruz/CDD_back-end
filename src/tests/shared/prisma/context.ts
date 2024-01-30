import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type Context = {
  prisma: PrismaClient
}

interface MockContext {
  prisma: DeepMockProxy<PrismaClient>,
}

const createMockContext = (): MockContext => ({
  prisma: mockDeep<PrismaClient>(),
});

export {
  MockContext,
  createMockContext,
};