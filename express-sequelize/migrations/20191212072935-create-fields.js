'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];
    
    migrations.push(
      await queryInterface.createTable('fields', {
        field_id: {
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
        field_name: {
          type: Sequelize.STRING(50)
        },
        description: {
          type: Sequelize.TEXT
        },
        price: {
          type: Sequelize.DOUBLE
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
      await queryInterface.bulkInsert('fields', [{
        place_id: 1,
        field_name: 'Lapangan Semen 1',
        description: 'Lapangan dengan material semen',
        price: 60000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        field_name: 'Lapangan Rumput Sintesis 1',
        description: 'Lapangan dengan permukaan rumput berbahan sintesis',
        price: 90000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        place_id: 1,
        field_name: 'Lapangan Parquette 1',
        description: 'Lapangan dengan permukaan kayu',
        price: 110000,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fields');
  }
};