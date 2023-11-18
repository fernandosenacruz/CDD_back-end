import { PrismaClient } from '@prisma/client';

import PrismaUserModel from './PrismaUserModel';
import PrismaPostModel from './PrismaPostModel';

const prisma = new PrismaClient();

const UserModel = new PrismaUserModel('user');
const PostModel = new PrismaPostModel('post');

export default { UserModel, PostModel, prisma };
