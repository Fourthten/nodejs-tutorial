import { Router } from 'express';
import { celebrate } from 'celebrate';

import userController from '../controller/userController';
import userSchema from '../schema/userSchema';

const router = Router();

router.post(
  '/login',
  celebrate(userSchema.login),
  userController.login,
);
  
export default router;
