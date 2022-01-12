'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('districts', {
        district_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        city_id: {
          allowNull: false,
          references: {
            model: 'cities',
            key: 'city_id'
          },
          type: Sequelize.INTEGER(11)
        },
        district_name: {
          type: Sequelize.STRING(25)
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
      await queryInterface.bulkInsert('districts', [
        // Kab. Aceh Barat
        {city_id: 1, district_name: 'Johan Pahlawan', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Samatiga', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Bubon', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Arongan Lambalek', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Woyla', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Woyla Barat', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Woyla Timur', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Kaway XVI', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Meureubo', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Pante Ceureumen', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Panton Reu', createdAt: new Date(), updatedAt: new Date()},
        {city_id: 1, district_name: 'Sungai Mas', createdAt: new Date(), updatedAt: new Date()}
      ], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('districts');
  }
};