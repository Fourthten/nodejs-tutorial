import { StatusCodes } from 'http-status-codes';

import roleService from '../service/roleService';
import { IController } from '../utility/apiInterface';
import apiResponse from '../utility/apiResponse';
import { generateCookie } from '../utility/encryptionUtil';
import constants from '../constant';
import locale from '../constant/locale';
import logger from '../config/logger';

const create: IController = async (req, res) => {
  let role: any;
  const { name, label, description } = req.body;

  const otherRole = await roleService.findRoleByName(name);
  if (otherRole.length > 0) {
    apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.en.DATA_ALREADY_EXISTS);
    return;
  }
  try {
    role = await roleService.createRole(
      name.toLowerCase(),
      label,
      description,
      req.user.username
    );
  } catch (e) {
    logger.info(`err create role: `, e.message);
  }
  if (role) {
    apiResponse.result(res, role, StatusCodes.CREATED, locale.en.RES_SUCCESS);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const update: IController = async (req, res) => {
  let role: any;
  const { id, name, label, description, isActive } = req.body;

  const existRole = await roleService.getRoleById(id);
  if (!existRole) {
    apiResponse.error(res, StatusCodes.NOT_FOUND, locale.en.DATA_NOT_FOUND);
    return;
  }
  const otherRole = await roleService.findRoleByNameUpdate(
    existRole.id,
    name
  );
  if (otherRole.length > 0) {
    apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.en.DATA_ALREADY_EXISTS);
    return;
  }
  try {
    role = await roleService.updateRole(
      name.toLowerCase(),
      label,
      description,
      isActive,
      req.user.username,
      existRole
    );
  } catch (e) {
    logger.info(`err update role: `, e.message);
  }
  if (role) {
    apiResponse.result(res, role, StatusCodes.CREATED, locale.en.RES_SUCCESS);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const view: IController = async (req, res) => {
  let role: any;
  const id: number = parseInt(req.params.id);

  try {
    role = await roleService.viewRole(id);
  } catch (e) {
    logger.info(`err detail role: `, e.message);
  }
  if (role) {
    apiResponse.result(res, role, StatusCodes.OK, locale.en.RES_SUCCESS);
  } else if (role === null) {
    apiResponse.error(res, StatusCodes.NOT_FOUND, locale.en.DATA_NOT_FOUND);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const list: IController = async (req, res) => {
  let roles: any;
  const search: string = req.query.search.toString();
  const offset: number = parseInt(req.query.offset.toString());
  const limit: number = parseInt(req.query.limit.toString());

  try {
    roles = await roleService.listRole(
      search,
      offset,
      limit
    );
  } catch (e) {
    logger.info(`err all role: `, e.message);
  }
  if (roles) {
    apiResponse.result(res, roles, StatusCodes.OK, locale.en.RES_SUCCESS);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const remove: IController = async (req, res) => {
  let role: any;
  const { name } = req.body;

  try {
    role = await roleService.removeRole(name);
  } catch (e) {
    logger.info(`err delete role: `, e.message);
  }
  if (role) {
    if (typeof role.isDeleted === 'undefined') {
      apiResponse.result(res, role, StatusCodes.OK, locale.en.RES_DELETED);
    } else {
      apiResponse.result(res, role, StatusCodes.OK, locale.en.RES_SUCCESS);
    }
  } else if (role === null) {
    apiResponse.error(res, StatusCodes.NOT_FOUND, locale.en.DATA_NOT_FOUND);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const restore: IController = async (req, res) => {
  let role: any;
  const { id, name } = req.body;

  const existRole = await roleService.getRoleById(id);
  if (!existRole) {
    apiResponse.error(res, StatusCodes.NOT_FOUND, locale.en.DATA_NOT_FOUND);
    return;
  }
  const otherRole = await roleService.findRoleByNameUpdate(
    existRole.id,
    name
  );
  if (otherRole.length > 0) {
    apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.en.DATA_ALREADY_EXISTS);
    return;
  }
  try {
    role = await roleService.restoreRole(
      name.toLowerCase(),
      req.user.username,
      existRole
    );
  } catch (e) {
    logger.info(`err update role: `, e.message);
  }
  if (role) {
    apiResponse.result(res, role, StatusCodes.CREATED, locale.en.RES_SUCCESS);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

export default {
  create,
  update,
  view,
  list,
  remove,
  restore
};
