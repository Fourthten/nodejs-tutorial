import { getRepository, Like, ILike, Not, Equal } from 'typeorm';
import moment from 'moment';

import { Role } from '../entity/role';
import { User } from '../entity/user';
import { RoleDto, SimpleRoleDto } from '../entity/dto/roleDto';

/** Repository */
const savingRole = async (role: Role) => {
  try {
    return await getRepository(Role).save(role);
  } catch (e) {
    return null;
  }
};

const getRoleById = async ( id: number ) => {
  try {
    return await getRepository(Role).findOne({ id: id });
  } catch (e) {
    return null;
  }
};

const getRoleByName = async ( name: string ) => {
  try {
    return await getRepository(Role).findOne({ name: name });
  } catch (e) {
    return null;
  }
};

const findRoleByName = async ( name: string ) => {
  try {
    return await getRepository(Role).find({ name: name });
  } catch (e) {
    return [];
  }
};

const findRoleByNameUpdate = async ( id: number, name: string ) => {
  try {
    return await getRepository(Role).find({ id: Not(Equal(id)), name: name });
  } catch (e) {
    return [];
  }
};

const findRoles = async (
  search: string,
  offset: number,
  limit: number,
) => {
  try {
    return await getRepository(Role).find({
      order: {
        name: 'ASC'
      },
      skip: offset,
      take: limit,
      where: { name: ILike(`%${search}%`), isDeleted: false },
    });
  } catch (e) {
    return [];
  }
};
/** End Repository */

/** Service */
const createRole = async (
  name: string,
  label: string,
  description: string,
  createdBy: string
) => {
  const newRole = new Role();
  newRole.name = name;
  newRole.label = label;
  newRole.description = description;
  newRole.createdBy = createdBy;
  const save = await savingRole(newRole);
  if (save) {
    const simpleRoleDto = new SimpleRoleDto();
    simpleRoleDto.name = newRole.name;
    simpleRoleDto.label = newRole.label;
    simpleRoleDto.description = newRole.description;
    simpleRoleDto.isActive = true;
    simpleRoleDto.isDeleted = false;
    return simpleRoleDto;
  }
  return null;
};

const updateRole = async (
  name: string,
  label: string,
  description: string,
  active: boolean,
  updatedBy: string,
  role: Role
) => {
  if (role) {
    role.name = name;
    role.label = label;
    role.description = description;
    if (typeof active !== 'undefined' && active !== null) {
      role.isActive = active;
    }
    role.updatedBy = updatedBy;
    role.updatedAt = new Date();
    const save = await savingRole(role);
    if (save) {
      const simpleRoleDto = new SimpleRoleDto();
      simpleRoleDto.name = role.name;
      simpleRoleDto.label = role.label;
      simpleRoleDto.description = role.description;
      simpleRoleDto.isActive = role.isActive;
      simpleRoleDto.isDeleted = role.isDeleted;
      return simpleRoleDto;
    }
  }
  return null;
};

const viewRole = async ( id: number ) => {
  const roleDto = new RoleDto();
  const role = await getRoleById(id);
  if (role) {
    roleDto.id = role.id;
    roleDto.name = role.name;
    roleDto.label = role.label;
    roleDto.description = role.description;
    roleDto.isActive = role.isActive;
    roleDto.isDeleted = role.isDeleted;
    roleDto.createdAt = moment(role.createdAt).format('DD-MM-YYYY HH:mm:ss');
    roleDto.createdBy = role.createdBy;
    roleDto.updatedAt = moment(role.updatedAt).format('DD-MM-YYYY HH:mm:ss');
    roleDto.updatedBy = role.updatedBy;
    return roleDto;
  }
  return null;
};

const listRole = async (
  search: string,
  offset: number,
  limit: number,
) => {
  const roles = await findRoles(search, offset, limit);
  if (roles) {
    const rolesDto = roles.map(role => {
      let roleDto = new RoleDto();
      roleDto.id = role.id;
      roleDto.name = role.name;
      roleDto.label = role.label;
      roleDto.description = role.description;
      roleDto.isActive = role.isActive;
      roleDto.isDeleted = role.isDeleted;
      roleDto.createdAt = moment(role.createdAt).format('DD-MM-YYYY HH:mm:ss');
      roleDto.createdBy = role.createdBy;
      roleDto.updatedAt = moment(role.updatedAt).format('DD-MM-YYYY HH:mm:ss');
      roleDto.updatedBy = role.updatedBy;
      return roleDto;
    });
    return rolesDto;
  }
  return null
};

const removeRole = async ( name: string ) => {
  const role = await getRoleByName(name);
  if (role) {
    const simpleRoleDto = new SimpleRoleDto();
    simpleRoleDto.name = role.name;
    simpleRoleDto.label = role.label;
    simpleRoleDto.description = role.description;
    const user = await getRepository(User).findOne({ roleId: role.id });
    if (user) {
      role.name = await changeNameDel(role.name);
      role.isActive = false;
      role.isDeleted = true;
      role.updatedAt = new Date();
      const save = await savingRole(role);
      if (save) {
        simpleRoleDto.isActive = save.isActive;
        simpleRoleDto.isDeleted = save.isDeleted;
        return simpleRoleDto;
      }
      return;
    } else {
      await getRepository(Role).delete({ id: role.id });
      return simpleRoleDto;
    }
  }
  return null;
};

const restoreRole = async (
  name: string,
  updatedBy: string,
  role: Role
) => {
  if (role) {
    role.name = name;
    role.isActive = true;
    role.isDeleted = false;
    role.updatedBy = updatedBy;
    role.updatedAt = new Date();
    const save = await savingRole(role);
    if (save) {
      const simpleRoleDto = new SimpleRoleDto();
      simpleRoleDto.name = role.name;
      simpleRoleDto.label = role.label;
      simpleRoleDto.description = role.description;
      simpleRoleDto.isActive = role.isActive;
      simpleRoleDto.isDeleted = role.isDeleted;
      return simpleRoleDto;
    }
  }
  return null;
};
/** End Service */

/** Function */
const changeNameDel = async ( name: string ) => {
  const otherRole = await getRepository(Role).findOne({
    order: { updatedAt: 'DESC' },
    where: { name: Like(`${name}-%`) }
  });
  if (otherRole) {
    const nameOther = otherRole.name.split('-');
    let num = (parseInt(nameOther[nameOther.length - 1]) + 1).toString();
    while (num.length < 3) num = '0' + num;
    return `${name}-${num}`;
  } else {
    return `${name}-001`;
  }
}
/** End Function */

export default {
  findRoleByName,
  findRoleByNameUpdate,
  getRoleById,
  getRoleByName,
  createRole,
  updateRole,
  viewRole,
  listRole,
  removeRole,
  restoreRole
};
