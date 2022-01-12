'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('schedules', {
        schedule_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        place_id: {
          allowNull: false,
          references: {
            model: 'places',
            key: 'place_id'
          },
          type: Sequelize.INTEGER(11)
        },
        open: {
          type: Sequelize.DATE
        },
        close: {
          type: Sequelize.DATE
        },
        day: {
          type: Sequelize.INTEGER
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
      await queryInterface.bulkInsert('schedules', [{
        place_id: 1,
        open: '0000-00-00 07:00:00',
        close: '0000-00-00 21:00:00',
        day: 0,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        open: '0000-00-00 08:00:00',
        close: '0000-00-00 17:00:00',
        day: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        open: '0000-00-00 08:00:00',
        close: '0000-00-00 17:00:00',
        day: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        open: '0000-00-00 08:00:00',
        close: '0000-00-00 17:00:00',
        day: 3,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        open: '0000-00-00 08:00:00',
        close: '0000-00-00 17:00:00',
        day: 4,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        open: '0000-00-00 00:00:00',
        close: '0000-00-00 00:00:00',
        day: 5,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        open: '0000-00-00 07:00:00',
        close: '0000-00-00 21:00:00',
        day: 6,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('schedules');
  }
};