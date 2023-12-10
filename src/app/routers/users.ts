import { Router } from 'express';

import { LoginMiddeware } from './../middlewares/auth';
import userValidations from '../middlewares/user';
import UserController from '../controllers/UserController';
import prisma from '../helpers/prisma';

const router: Router = Router();
const loginMiddeware = new LoginMiddeware({ prisma});
const userController = new UserController({ prisma });

router.get('/users', loginMiddeware.validateToken, userController.getAll);

router.get('/users/:id', loginMiddeware.validateToken, userController.getById);

router.post('/users', userValidations.validateCreate, userController.create);

router.put('/users/:id', loginMiddeware.validateToken, userValidations.validateUpdate, userController.updateOne);

router.delete('/users/:id', loginMiddeware.validateToken, userController.deleteOne);

export default router;