import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

import { Role } from '../role';
import { BaseEntityDto } from './baseEntityDto';

export class UserDto extends BaseEntityDto {
  @Column({ nullable: true })
  id: number;
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  picture: string;
  @Column({ nullable: true })
  roleId: number;
  @Column({ nullable: true })
  lastLogin: string;
  @Column({ nullable: true })
  role: Role;
}

export class SimpleUserDto {
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  roleId: number;
  @Column({ nullable: true })
  isActive: boolean;
  @Column({ nullable: true })
  isDeleted: boolean;
}