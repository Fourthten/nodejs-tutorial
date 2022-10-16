import { celebrate, Joi, errors, Segments } from 'celebrate';

export default {
  create: {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(50).trim().lowercase().required(),
      label: Joi.string().max(150).allow(null, '').default(''),
      description: Joi.string().allow(null, '').default('')
    },
  },
  update: {
    [Segments.BODY]: {
      id: Joi.number().required(),
      name: Joi.string().min(3).max(50).trim().lowercase().required(),
      label: Joi.string().max(150).allow(null, '').default(''),
      description: Joi.string().allow(null, '').default(''),
      isActive: Joi.boolean().allow(null)
    },
  },
  view: {
    [Segments.PARAMS]: {
      id: Joi.number().required()
    },
  },
  list: {
    [Segments.QUERY]: {
      search: Joi.string().allow(null, '').default(''),
      offset: Joi.number().allow(null, '').default(0),
      limit: Joi.number().allow(null, '').default(10),
      sort: Joi.string().allow(null, ''),
      order: Joi.string().allow(null, '')
    },
  },
  delete: {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(50).trim().lowercase().required()
    },
  },
  restore: {
    [Segments.BODY]: {
      id: Joi.number().required(),
      name: Joi.string().min(3).max(50).trim().lowercase().required()
    },
  }
};
