import { Router } from 'express';

import userValidations from '../middlewares/user';
import Loginontroller from '../controllers/LoginController';
import prisma from '../helpers/prisma';

const router: Router = Router();
const loginController = new Loginontroller({ prisma });

router.post('/login', userValidations.validateLogin, loginController.login);

export default router;