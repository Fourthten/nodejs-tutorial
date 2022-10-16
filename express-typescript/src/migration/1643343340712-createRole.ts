import { MigrationInterface, QueryRunner, Table, getRepository, TableIndex } from 'typeorm';
import { Role } from '../entity/role';

export class createRole1643343340712 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'roles',
      columns: [
        {
          name: 'id',
          type: 'int',
          generationStrategy: 'increment',
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '54'
        },
        {
          name: 'label',
          type: 'varchar',
          length: '150',
          default: "''"
        },
        {
          name: 'description',
          type: 'text',
          isNullable: true
        },
        {
          name: 'createdAt',
          type: 'datetime',
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'updatedAt',
          type: 'datetime',
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'createdBy',
          type: 'varchar',
          length: '100',
          isNullable: true
        },
        {
          name: 'updatedBy',
          type: 'varchar',
          length: '100',
          isNullable: true
        },
        {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        {
          name: 'isDeleted',
          type: 'boolean',
          default: false
        }
      ]
    }), true);

    await queryRunner.createIndex('roles', new TableIndex({
      name: 'IDX_ROLE',
      columnNames: ['name']
    }));

    // not work for mysql
    // await queryRunner.createUniqueConstraint('tables', new TableUnique({ name: 'Name_Constraint', columnNames: ['field'] }));
    // await queryRunner.dropUniqueConstraint('tables', 'Name_Constraint');

    let role = new Role();
    role.name = 'admin';
    role.label = 'Administrator';
    role.description = 'Could access anything.';
    role.createdBy = 'default';
    const roleRepository = getRepository(Role);
    await roleRepository.save(role);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('roles', 'IDX_ROLE');
    await queryRunner.dropTable('roles');
  }

}
