import userService from '../../service/userService';
import { mockRepository } from '../unit/dbMock';
import * as typeorm from 'typeorm';
import { User } from '../../entity/user';
import { verifyHash } from '../../utility/encryptionUtil';

const bcrypt = require('bcrypt');

describe('User service', () => {
  test('getUserById with existing user', async () => {
    const user = {
        id: 1,
        username: 'testing',
        password: '123456',
        name: 'Test User',
        email: 'test@mail.co.id',
        phone: '62813',
        address: 'Bekasi',
        picture: null,
        roleId: 1,
    }
    mockRepository(user);
    const actual = await userService.getUserById(1);
    expect(actual.id).toBe(1);
    expect(actual.username).toBe('test');
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        ...user,
        lastLogin: expect.any(String),
      }),
    );
  });
});