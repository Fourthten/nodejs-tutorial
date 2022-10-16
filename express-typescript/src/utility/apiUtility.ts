import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../entity/user';
import ApiResponse from './apiResponse';
import { IRequest } from './apiInterface';

// const extractUserIdFromRequest = (req: IRequest) => {
//   return req.user && req.user.id;
// };

// const extractQueryForRequest = (req: Request, query: any) => {
//   if (req.query[query]) {
//     // @ts-ignore
//     return JSON.parse(req.query[query]);
//   }
//   return [];
// };

const extractCookieFromRequest = (req: Request, key: string) => {
  if (req.headers.authorization) {
    const auth = req.headers.authorization;
    if(auth.startsWith(`Bearer`)) {
      const token = auth.split(' ');
      return token[1];
    }
    return auth;
  }
  // if (req.headers.cookie) {
  //   const cookie = req.headers.cookie;
  //   const results = (cookie instanceof Array) ? cookie : cookie.split(';');
  //   const filtered = results.filter((result: string) => {
  //     return result.startsWith(`${key}=`);
  //   });
  //   if (filtered.length > 0) {
  //     return filtered[0].split('=')[1];
  //   }
  // }
  return null;
};

const sanitizeUser = (user: User) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

// const restrictToStaff = (
//   req: IRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   if (!req.user.isActive) {
//     ApiResponse.error(res, StatusCodes.FORBIDDEN);
//     return;
//   }
//   next();
// };

export {
//   extractUserIdFromRequest,
//   extractQueryForRequest,
  sanitizeUser,
  extractCookieFromRequest,
//   restrictToStaff,
};
