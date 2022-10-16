import { StatusCodes } from 'http-status-codes';

import userService from '../service/userService';
import { IController } from '../utility/apiInterface';
import apiResponse from '../utility/apiResponse';
import { generateCookie } from '../utility/encryptionUtil';
import constants from '../constant';
import locale from '../constant/locale';
import logger from '../config/logger';

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.Cookie.COOKIE_USER,
    value: await generateCookie(
      constants.Cookie.KEY_USER_ID,
      userId.toString(),
    ),
  };
};

const login: IController = async (req, res) => {
  const user = await userService.loginUser(
    req.body.username,
    req.body.password,
  );
  if (user) {
    const cookie = await generateUserCookie(user.id);
    const data: { [key: string]: string } = {};
    data["key"] = cookie.value;
    apiResponse.result(res, data, StatusCodes.OK, locale.en.RES_SUCCESS, cookie);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.en.INVALID_CREDENTIALS);
  }
};

const create: IController = async (req, res) => {
  let user: any;
  const { username, password, name, email, phone, address, roleId } = req.body;

  const otherUser = await userService.findUserByUsernameOrEmailOrPhone( username, email, phone );
  if (otherUser.length > 0) {
    apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.en.USER_ALREADY_EXISTS);
    return;
  }
  try {
    user = await userService.createUser(
      username.toLowerCase(),
      password,
      name,
      email,
      phone,
      address,
      roleId,
      req.user.username
    );
  } catch (e) {
    logger.info(`err create user: `, e.message);
  }
  if (user) {
    apiResponse.result(res, user, StatusCodes.CREATED, locale.en.RES_SUCCESS);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const update: IController = async (req, res) => {
  let user: any;
  const { username, password, name, email, phone, address, roleId, isActive } = req.body;

  const existUser = await userService.getUserByUsername(username);
  if (!existUser) {
    apiResponse.error(res, StatusCodes.NOT_FOUND, locale.en.DATA_NOT_FOUND);
    return;
  }
  const otherUser = await userService.findUserByUsernameOrEmailOrPhoneUpdate(
    existUser.id,
    username,
    email,
    phone
  );
  if (otherUser.length > 0) {
    apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.en.USER_ALREADY_EXISTS);
    return;
  }
  try {
    user = await userService.updateUser(
      username.toLowerCase(),
      password,
      name,
      email,
      phone,
      address,
      roleId,
      isActive,
      req.user.username,
      existUser
    );
  } catch (e) {
    logger.info(`err update user: `, e.message);
  }
  if (user) {
    apiResponse.result(res, user, StatusCodes.CREATED, locale.en.RES_SUCCESS);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const view: IController = async (req, res) => {
  let user: any;
  const username: string = req.params.username;
  
  try {
    user = await userService.viewUser(username);
  } catch (e) {
    logger.info(`err detail user: `, e.message);
  }
  if (user) {
    apiResponse.result(res, user, StatusCodes.OK, locale.en.RES_SUCCESS);
  } else if (user === null) {
    apiResponse.error(res, StatusCodes.NOT_FOUND, locale.en.DATA_NOT_FOUND);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const list: IController = async (req, res) => {
  let users: any;
  const search: string = req.query.search.toString();
  const offset: number = parseInt(req.query.offset.toString());
  const limit: number = parseInt(req.query.limit.toString());

  try {
    users = await userService.listUser(
      search,
      offset,
      limit
    );
  } catch (e) {
    logger.info(`err all user: `, e.message);
  }
  if (users) {
    apiResponse.result(res, users, StatusCodes.OK, locale.en.RES_SUCCESS);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const remove: IController = async (req, res) => {
  let user: any;
  const { username } = req.body;
  
  try {
    user = await userService.removeUser(username);
  } catch (e) {
    logger.info(`err delete user: `, e.message);
  }
  if (user) {
    if (typeof user.isDeleted === 'undefined') {
      apiResponse.result(res, user, StatusCodes.OK, locale.en.RES_DELETED);
    } else {
      apiResponse.result(res, user, StatusCodes.OK, locale.en.RES_SUCCESS);
    }
  } else if (user === null) {
    apiResponse.error(res, StatusCodes.NOT_FOUND, locale.en.DATA_NOT_FOUND);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

export default {
  login,
  create,
  update,
  view,
  list,
  remove
};
