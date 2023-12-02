import { Router } from 'express';

import userValidations from '../middlewares/user';
import UserController from '../controllers/UserController';
import prisma from '../helpers/prisma';

const router: Router = Router();
const userController = new UserController({ prisma });

router.get('/users', userController.getAll);

router.get('/users/:id', userController.getById);

router.post('/login', userValidations.validateLogin);
router.post('/users', userValidations.validateCreate, userController.create);

router.put('/users/:id', userValidations.validateUpdate, userController.updateOne);

router.delete('/users/:id', userController.deleteOne);

export default router;