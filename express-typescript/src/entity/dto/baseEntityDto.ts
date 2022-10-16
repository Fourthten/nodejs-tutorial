import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

export class BaseEntityDto {
  @Column({ nullable: true })
  createdAt: string;
  @Column({ nullable: true })
  updatedAt: string;
  @Column({ nullable: true })
  createdBy: string;
  @Column({ nullable: true })
  updatedBy: string;
  @Column({ nullable: true })
  isActive: boolean;
  @Column({ nullable: true })
  isDeleted: boolean;
}