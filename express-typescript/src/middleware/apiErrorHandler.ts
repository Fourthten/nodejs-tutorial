import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { IError } from '../utility/apiInterface';

export function notFoundErrorHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.status(StatusCodes.NOT_FOUND).json({
    code: StatusCodes.NOT_FOUND,
    success: false,
    message: getReasonPhrase(StatusCodes.NOT_FOUND),
  });
}

export function errorHandler(
  err: IError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
    success: false,
    message: err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  });
}
