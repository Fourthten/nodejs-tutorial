import application from '../constant/application';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateHash = async (
  password: string,
  saltRounds: number,
): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
      if (!err) {
        resolve(hash);
      }
      reject(err);
    });
  });

const verifyHash = async (
  password: string,
  hash: string,
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err: any, result: string) => {
      if (result) {
        resolve(true);
      }
      resolve(false);
    });
  });

const generateCookie = async (key: string, value: string) => {
  const data: { [key: string]: string } = {};
  data[key] = value;
  return jwt.sign({ data }, application.env.authSecret, {
    expiresIn: application.timers.userCookieExpiry,
  });
};

const verifyCookie = async (token: string): Promise<any> =>
  new Promise(resolve => {
    jwt.verify(
      token,
      application.env.authSecret,
      (err: Error, decoded: any) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded);
        }
      },
    );
  });

export { generateHash, verifyHash, generateCookie, verifyCookie };
