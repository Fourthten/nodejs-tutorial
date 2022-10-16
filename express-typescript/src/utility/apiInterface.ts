import { Request, Response } from 'express';

import { User } from '../entity/user';

export interface IRequest extends Request {
  user: User;
  dashboard: boolean;
}

export interface IController {
  (req: IRequest, res: Response): void;
}

export interface IOverrideRequest {
  code: number;
  message: string;
  positive: string;
  negative: string;
}

export interface ICookie {
  key: string;
  value: string;
}

export interface IError {
  status?: number;
  code?: number;
  message?: string;
}
