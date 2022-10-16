import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import userService from '../service/userService';
import apiResponse from '../utility/apiResponse';
import { verifyCookie } from '../utility/encryptionUtil';
import { extractCookieFromRequest } from '../utility/apiUtility';
import application from '../constant/application';
import Constants from '../constant';
import { IRequest } from '../utility/apiInterface';

export default async (
  req: IRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (
    application.authorizationIgnorePath.indexOf(
      `${req.originalUrl}`,
    ) === -1
  ) {
    const authorizationHeader = extractCookieFromRequest(
      req,
      Constants.Cookie.COOKIE_USER,
    );
    if (authorizationHeader) {
      const decoded = await verifyCookie(authorizationHeader);
      if (decoded) {
        const user = await userService.getUserById(
          decoded.data[Constants.Cookie.KEY_USER_ID],
        );
        if (user) {
          // @ts-ignore
          req.user = user;
          req.dashboard = req.headers['context'] === 'dashboard' && user.isActive;
        } else {
          apiResponse.error(res, StatusCodes.UNAUTHORIZED);
          return;
        }
      } else {
        apiResponse.error(res, StatusCodes.UNAUTHORIZED);
        return;
      }
    } else {
      apiResponse.error(res, StatusCodes.FORBIDDEN);
      return;
    }
  }

  next();
};
