import { MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey, TableUnique, getRepository } from 'typeorm';

import { Role } from '../entity/role';
import { User } from '../entity/user';
import { generateHash } from '../utility/encryptionUtil';

export class createUser1643343705813 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          generationStrategy: 'increment',
          isGenerated: true,
          isPrimary: true
        },
        {
          name: 'username',
          type: 'varchar',
          length: '50'
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100'
        },
        {
          name: 'email',
          type: 'varchar',
          length: '150'
        },
        {
          name: 'phone',
          type: 'varchar',
          length: '20'
        },
        {
          name: 'address',
          type: 'text',
          isNullable: true
        },
        {
          name: 'picture',
          type: 'text',
          isNullable: true
        },
        {
          name: 'roleId',
          type: 'int'
        },
        {
          name: 'lastLogin',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
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

    await queryRunner.createIndex('users', new TableIndex({
      name: 'IDX_USER',
      columnNames: ['username', 'email', 'phone']
    }));

    await queryRunner.createForeignKey('users', new TableForeignKey({
      name: 'FK_USERROLE',
      columnNames: ['roleId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      onDelete: 'CASCADE'
    }));

    const role = await getRepository(Role).findOne({ name: 'admin' });
    let user = new User();
    user.username = 'admin';
    user.password = await generateHash('cranium22', 10);
    user.name = 'Administrator';
    user.email = 'admin@mail.com';
    user.phone = '628';
    user.address = 'Jakarta';
    user.roleId = role.id;
    user.createdBy = 'default';
    const roleRepository = getRepository(User);
    await roleRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    // const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('roleId') !== -1);
    await queryRunner.dropForeignKey('users', 'FK_USERROLE');
    await queryRunner.dropIndex('users', 'IDX_USER');
    await queryRunner.dropTable('users');
  }

}
