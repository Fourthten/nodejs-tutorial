import { celebrate, Joi, errors, Segments } from 'celebrate';

export default {
  login: {
    [Segments.BODY]: {
      username: Joi.string().min(3).max(50).trim().lowercase().required(),
      password: Joi.string().min(6).max(32).required()
    },
  },
  create: {
    [Segments.BODY]: {
      username: Joi.string().min(3).max(50).trim().lowercase().required(),
      password: Joi.string().min(6).max(32).required(),
      name: Joi.string().max(100).required(),
      email: Joi.string().email().max(150).required(),
      phone: Joi.string().max(15).required(),
      address: Joi.string().allow(null, '').default(''),
      roleId: Joi.number().required()
    },
  },
  update: {
    [Segments.BODY]: {
      username: Joi.string().min(3).max(50).trim().lowercase().required(),
      password: Joi.string().min(6).max(32).allow(null, ''),
      name: Joi.string().max(100).required(),
      email: Joi.string().email().max(150).required(),
      phone: Joi.string().max(15).required(),
      address: Joi.string().allow(null, '').default(''),
      roleId: Joi.number().required(),
      isActive: Joi.boolean().allow(null),
    },
  },
  view: {
    [Segments.PARAMS]: {
      username: Joi.string().min(3).max(50).trim().lowercase().required()
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
      username: Joi.string().min(3).max(50).trim().lowercase().required()
    },
  },
};
