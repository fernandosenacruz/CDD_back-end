import { Router } from 'express';

import postValidations from '../middlewares/post';
import PostController from '../controllers/PostController';
import prisma from '../helpers/prisma';

const router: Router = Router();
const postController = new PostController({ prisma });

router.get('/posts', postController.getAll);

router.get('/posts/:id', postController.getById);

router.post('/posts', postValidations.validateCreate, postController.create);

router.put('/posts/:id', postValidations.validateUpdate, postController.updateOne);

router.delete('/posts/:id', postController.deleteOne);

export default router;