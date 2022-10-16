import { getRepository, Like, ILike, Not, Equal, Brackets } from 'typeorm';
import moment from 'moment';

import { User } from '../entity/user';
import { Role } from '../entity/role';
import { UserDto, SimpleUserDto } from '../entity/dto/userDto';
import { generateHash, verifyHash } from '../utility/encryptionUtil';
import { sanitizeUser } from '../utility/apiUtility';

/** Repository */
const savingUser = async (user: User) => {
  try {
    return await getRepository(User).save(user);
  } catch (e) {
    return null;
  }
};

const getUserById = async (userId: number) => {
  try {
    const user = await getRepository(User).findOne({ id: userId });
    if (user) {
      return sanitizeUser(user);
    }
    return null;
  } catch (e) {
    return null;
  }
};

const getUserByUsername = async ( username: string ) => {
  try {
    return await getRepository(User).findOne({ username: username });
  } catch (e) {
    return null;
  }
};

const getUserByUsernameWithRole = async ( username: string ) => {
  try {
    return await getRepository(User).findOne({
      relations: ['role'],
      where: { username: username }
    });
  } catch (e) {
    return null;
  }
};

const findUserByUsernameOrEmailOrPhone = async (
  username: string,
  email: string,
  phone: string,
) => {
  try {
    return await getRepository(User).find({
      where: [
        { username: username },
        { email: email },
        { phone: phone },
      ]
    });
  } catch (e) {
    return [];
  }
};

const findUserByUsernameOrEmailOrPhoneUpdate = async (
  id: number,
  username: string,
  email: string,
  phone: string,
) => {
  try {
    return await getRepository(User).createQueryBuilder()
      .where(new Brackets(qb => {
        qb.where('username = :username', { username: username })
          .orWhere('email = :email', { email: email })
          .orWhere('phone = :phone', { phone: phone })
      }))
      .andWhere('id != :id', { id: id })
      .getMany();
  } catch (e) {
    return [];
  }
};

const findUsers = async (
  search: string,
  offset: number,
  limit: number,
) => {
  try {
    return await getRepository(User).createQueryBuilder('u')
      .leftJoinAndMapOne('u.role', Role, 'r', 'r.id = u.roleId')
      .where(new Brackets(qb => {
        qb.where('UPPER(u.username) LIKE UPPER(:username)', { username: `%${search}%` })
          .orWhere('UPPER(u.name) LIKE UPPER(:name)', { name: `%${search}%` })
          .orWhere('UPPER(u.email) LIKE UPPER(:email)', { email: `%${search}%` })
          .orWhere('UPPER(u.phone) LIKE UPPER(:phone)', { phone: `%${search}%` })
      }))
      .andWhere('u.isDeleted = false')
      .orderBy('u.name', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany();
  } catch (e) {
    return [];
  }
};
/** End Repository */

/** Service */
const loginUser = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (user) {
    if (await verifyHash(password, user.password)) {
      user.lastLogin = new Date().getTime().toString();
      savingUser(user);
      return sanitizeUser(user);
    }
  }
  return null;
};

const createUser = async (
  username: string,
  pass: string,
  name: string,
  email: string,
  phone: string,
  address: string = '',
  role: number,
  createdBy: string
) => {
  const newUser = new User();
  newUser.username = username;
  newUser.password = await generateHash(pass, 10);
  newUser.name = name;
  newUser.email = email;
  newUser.phone = phone;
  newUser.address = address;
  newUser.roleId = role;
  newUser.createdBy = createdBy;
  const save = await savingUser(newUser);
  if (save) {
    const simpleUserDto = new SimpleUserDto();
    simpleUserDto.username = newUser.username;
    simpleUserDto.name = newUser.name;
    simpleUserDto.email = newUser.email;
    simpleUserDto.phone = newUser.phone;
    simpleUserDto.roleId = newUser.roleId;
    simpleUserDto.isActive = true;
    simpleUserDto.isDeleted = false;
    return simpleUserDto;
  }
  return null;
};

const updateUser = async (
  username: string,
  pass: string,
  name: string,
  email: string,
  phone: string,
  address: string = '',
  role: number,
  active: boolean,
  updatedBy: string,
  user: User,
) => {
  if (user) {
    user.username = username;
    if (pass) {
      user.password = await generateHash(pass, 10);
    }
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.roleId = role;
    if (typeof active !== 'undefined' && active !== null) {
      user.isActive = active;
    }
    user.updatedBy = updatedBy;
    user.updatedAt = new Date();
    const save = await savingUser(user);
    if (save) {
      const simpleUserDto = new SimpleUserDto();
      simpleUserDto.username = user.username;
      simpleUserDto.name = user.name;
      simpleUserDto.email = user.email;
      simpleUserDto.phone = user.phone;
      simpleUserDto.roleId = user.roleId;
      simpleUserDto.isActive = user.isActive;
      simpleUserDto.isDeleted = user.isDeleted;
      return simpleUserDto;
    }
  }
  return null;
};

const viewUser = async ( username: string ) => {
  const userDto = new UserDto();
  const user = await getUserByUsernameWithRole(username);
  if (user) {
    let role = new Role();
    if (user.role) {
      role.name = user.role.name;
      role.label = user.role.label;
    }
    userDto.id = user.id;
    userDto.username = user.username;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.phone = user.phone;
    userDto.address = user.address;
    userDto.picture = user.picture;
    userDto.roleId = user.roleId;
    userDto.role = role;
    userDto.lastLogin = moment(user.lastLogin).format('DD-MM-YYYY HH:mm:ss');
    userDto.isActive = user.isActive;
    userDto.isDeleted = user.isDeleted;
    userDto.createdAt = moment(user.createdAt).format('DD-MM-YYYY HH:mm:ss');
    userDto.createdBy = user.createdBy;
    userDto.updatedAt = moment(user.updatedAt).format('DD-MM-YYYY HH:mm:ss');
    userDto.updatedBy = user.updatedBy;
    return userDto;
  }
  return null;
};

const listUser = async (
  search: string,
  offset: number,
  limit: number,
) => {
  const users = await findUsers(search, offset, limit);
  console.log(users);
  if (users) {
    const usersDto = users.map(user => {
      let role = new Role();
      if (user.role) {
        role.name = user.role.name;
        role.label = user.role.label;
      }
      let userDto = new UserDto();
      userDto.id = user.id;
      userDto.username = user.username;
      userDto.name = user.name;
      userDto.email = user.email;
      userDto.phone = user.phone;
      userDto.address = user.address;
      userDto.picture = user.picture;
      userDto.roleId = user.roleId;
      userDto.role = role;
      userDto.lastLogin = moment(user.lastLogin).format('DD-MM-YYYY HH:mm:ss');
      userDto.isActive = user.isActive;
      userDto.isDeleted = user.isDeleted;
      userDto.createdAt = moment(user.createdAt).format('DD-MM-YYYY HH:mm:ss');
      userDto.createdBy = user.createdBy;
      userDto.updatedAt = moment(user.updatedAt).format('DD-MM-YYYY HH:mm:ss');
      userDto.updatedBy = user.updatedBy;
      return userDto;
    });
    return usersDto;
  }
  return null;
};

const removeUser = async ( username: string ) => {
  const user = await getUserByUsername(username);
  if (user) {
    const simpleUserDto = new SimpleUserDto();
    simpleUserDto.username = user.username;
    simpleUserDto.phone = user.phone;
    simpleUserDto.email = user.email;
    // const relation = await getRepository(User).findOne({ roleId: role.id });
    // if (relation) {
    //   user.username = await changeNameDel(user.username);
    //   user.isActive = false;
    //   user.isDeleted = true;
    //   user.updatedAt = new Date();
    //   const save = await savingUser(user);
    //   if (save) {
    //     simpleUserDto.isActive = save.isActive;
    //     simpleUserDto.isDeleted = save.isDeleted;
    //     return simpleUserDto;
    //   }
    //   return;
    // } else {
      await getRepository(User).delete({ id: user.id });
      return simpleUserDto;
    // }
  }
  return null;
};
/** End Service */

// const changeNameDel = async ( username: string ) => {
//   const otherUser = await getRepository(User).findOne({
//     order: { updatedAt: 'DESC' },
//     where: { username: Like(`${username}-%`) }
//   });
//   if (otherUser) {
//     const nameOther = otherUser.username.split('-');
//     let num = (parseInt(nameOther[nameOther.length - 1]) + 1).toString();
//     while (num.length < 3) num = '0' + num;
//     return `${username}-${num}`;
//   } else {
//     return `${username}-001`;
//   }
// }

export default {
  findUserByUsernameOrEmailOrPhone,
  findUserByUsernameOrEmailOrPhoneUpdate,
  getUserById,
  getUserByUsername,
  loginUser,
  createUser,
  updateUser,
  viewUser,
  listUser,
  removeUser
};
