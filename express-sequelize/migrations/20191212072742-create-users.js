'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('users', {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        username: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING(18)
        },
        password: {
          type: Sequelize.STRING(255)
        },
        full_name: {
          allowNull: false,
          type: Sequelize.STRING(30)
        },
        email: {
          type: Sequelize.STRING(30)
        },
        phone_number: {
          type: Sequelize.STRING(13)
        },
        address: {
          type: Sequelize.TEXT
        },
        birthdate: {
          type: Sequelize.DATE
        },
        photo_url: {
          type: Sequelize.STRING(255)
        },
        verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        role_id: {
          allowNull: false,
          references: {
            model: 'roles',
            key: 'role_id'
          },
          type: Sequelize.INTEGER(4)
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    );

    migrations.push(
      await queryInterface.bulkInsert('users', [{
        username: 'admin',
        password: '78f9858503b9c1d9b86649657d50d3f9e0164df7f93be7d7fdfb42cbd24646db',
        full_name: 'Administrator',
        email: 'admin@gmail.com',
        phone_number: '081234567890',
        address: 'Jl. Pakem - Kalasan, Bima Hackers Village, Kec. Ngemplak, Kab. Sleman, DI Yogyakarta',
        birthdate: '2019-12-09',
        photo_url: 'https://drive.google.com/file/d/11_MJtlhlLcaqdzYyoU1Kd0dJiYlbHyUB/view',
        verified: true,
        role_id: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        username: 'owner1',
        password: '78f9858503b9c1d9b86649657d50d3f9e0164df7f93be7d7fdfb42cbd24646db',
        full_name: 'Pemilik Pertama',
        email: 'owner1@gmail.com',
        phone_number: '081234567891',
        address: 'Jl. Pakem - Kalasan, Bima Hackers Village, Kec. Ngemplak, Kab. Sleman, DI Yogyakarta',
        birthdate: '1990-12-09',
        photo_url: 'https://drive.google.com/file/d/11_MJtlhlLcaqdzYyoU1Kd0dJiYlbHyUB/view',
        verified: true,
        role_id: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        username: 'tenant1',
        password: '78f9858503b9c1d9b86649657d50d3f9e0164df7f93be7d7fdfb42cbd24646db',
        full_name: 'Penyewa Pertama',
        email: 'tenant1@gmail.com',
        phone_number: '081234567893',
        address: 'Jl. Pakem - Kalasan, Bima Hackers Village, Kec. Ngemplak, Kab. Sleman, DI Yogyakarta',
        birthdate: '1994-12-09',
        photo_url: 'https://drive.google.com/file/d/11_MJtlhlLcaqdzYyoU1Kd0dJiYlbHyUB/view',
        verified: true,
        role_id: 3,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};