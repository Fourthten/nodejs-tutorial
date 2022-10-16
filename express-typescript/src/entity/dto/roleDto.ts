import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

import { BaseEntityDto } from './baseEntityDto';

export class RoleDto extends BaseEntityDto {
  @Column({ nullable: true })
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  label: string;
  @Column({ nullable: true })
  description: string;
}

export class SimpleRoleDto {
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  label: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  isActive: boolean;
  @Column({ nullable: true })
  isDeleted: boolean;
}