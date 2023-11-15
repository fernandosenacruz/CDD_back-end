import { PrismaClient } from '@prisma/client';

interface IContext {
  prisma: PrismaClient;
}

export default IContext;