'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('cities', {
        city_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        province_id: {
          allowNull: false,
          references: {
            model: 'provinces',
            key: 'province_id'
          },
          type: Sequelize.INTEGER(11)
        },
        city_name: {
          type: Sequelize.STRING(25)
        },
        type: {
          type: Sequelize.STRING(10)
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
      await queryInterface.bulkInsert('cities', [
        // Aceh
        {province_id: 1, city_name: 'Kab. Aceh Barat', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Barat Daya', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Besar', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Jaya', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Selatan', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Singkil', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Tamiang', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Tengah', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Tenggara', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Timur', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Aceh Utara', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Bener Meriah', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Bireuen', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Gayo Lues', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Nagan Raya', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Pidie', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Pidie Jaya', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kab. Simeulue', type: 'Kabupaten', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kota Banda Aceh', type: 'Kota', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kota Langsa', type: 'Kota', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kota Lhokseumawe', type: 'Kota', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kota Sabang', type: 'Kota', createdAt: new Date(), updatedAt: new Date()},
        {province_id: 1, city_name: 'Kota Subulussalam', type: 'Kota', createdAt: new Date(), updatedAt: new Date()}
      ], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cities');
  }
};