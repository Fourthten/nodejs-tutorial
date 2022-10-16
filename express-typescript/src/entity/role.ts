import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, JoinTable } from 'typeorm';

import { User } from './user';
import { BaseEntity } from './base/baseEntity';

@Entity('roles', { orderBy: {  id: 'ASC' } })
@Unique('IDX_ROLE', ['name'])
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 54 })
  name: string;

  @Column({ length: 150, default: '' })
  label: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(type => User, user => user.role)
  users: User[];

}