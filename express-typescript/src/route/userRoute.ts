import { Router } from 'express';
import { celebrate } from 'celebrate';

import userController from '../controller/userController';
import userSchema from '../schema/userSchema';

const router = Router();

router.post(
  '/',
  celebrate(userSchema.create),
  userController.create,
);
router.put(
  '/',
  celebrate(userSchema.update),
  userController.update,
);
router.get(
  '/:username/detail',
  celebrate(userSchema.view),
  userController.view,
);
router.get(
  '/all',
  celebrate(userSchema.list),
  userController.list,
);
router.delete(
  '/',
  celebrate(userSchema.delete),
  userController.remove,
);
  
export default router;
