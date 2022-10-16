import { Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { ICookie, IOverrideRequest } from './apiInterface';

export default class ApiResponse {
  static result = (
    res: Response,
    data: object,
    status: number = StatusCodes.OK,
    alert: string = getReasonPhrase(status),
    cookie?: ICookie,
  ) => {
    res.status(status);
    if (cookie) {
      res.cookie(cookie.key, cookie.value);
    }
    res.json({
      code: status,
      data,
      message: alert,
      success: true,
    });
  };

  static error = (
    res: Response,
    status: number = StatusCodes.BAD_REQUEST,
    error: string = getReasonPhrase(status),
    override?: IOverrideRequest,
  ) => {
    res.status(status).json({
      code: status,
      override,
      message: error,
      success: false,
    });
  };

  static setCookie = (res: Response, key: string, value: string) => {
    res.cookie(key, value);
  };
}
