import { Router } from 'express';

import { LoginMiddeware } from './../middlewares/auth';
import postValidations from '../middlewares/post';
import PostController from '../controllers/PostController';
import prisma from '../helpers/prisma';

const router: Router = Router();
const postController = new PostController({ prisma });
const loginMiddeware = new LoginMiddeware({ prisma});

router.get('/posts', postController.getAll);

router.get('/posts/:id', postController.getById);

router.get('/posts/:authorId', postController.getByAuthorId);

router.post('/posts', loginMiddeware.validateToken, postValidations.validateCreate, postController.create);

router.put('/posts/:id', loginMiddeware.validateToken, postValidations.validateUpdate, postController.updateOne);

router.delete('/posts/:id', loginMiddeware.validateToken, postController.deleteOne);

export default router;