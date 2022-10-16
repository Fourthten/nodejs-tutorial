import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base/baseEntity';

import { Role } from './role';

@Entity('users', { orderBy: {  id: 'ASC' } })
@Unique('IDX_USER', ['username', 'email', 'phone'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column()
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  picture: string;

  @Column()
  roleId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  lastLogin: string;

  @ManyToOne(type => Role)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: Role;

}
