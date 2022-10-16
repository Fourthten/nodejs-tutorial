import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import roleController from '../controller/roleController';
import roleSchema from '../schema/roleSchema';

const router = Router();

router.post(
  '/',
  celebrate(roleSchema.create),
  roleController.create,
);
router.put(
  '/',
  celebrate(roleSchema.update),
  roleController.update,
);
router.get(
  '/:id/detail',
  celebrate(roleSchema.view),
  roleController.view,
);
router.get(
  '/all',
  celebrate(roleSchema.list),
  roleController.list,
);
router.delete(
  '/',
  celebrate(roleSchema.delete),
  roleController.remove,
);
router.post(
  '/restore',
  celebrate(roleSchema.restore),
  roleController.restore,
);

export default router;
