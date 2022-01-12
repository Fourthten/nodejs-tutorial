'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('provinces', {
        province_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        province_name: {
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
      await queryInterface.bulkInsert('provinces', [{
        province_name: 'Aceh', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sumatra Utara', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sumatra Barat', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Riau', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Kepulauan Riau', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Jambi', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Bengkulu', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sumatra Selatan', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Kepulauan Bangka Belitung', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Lampung', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Banten', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Jawa Barat', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'DKI Jakarta', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Jawa Tengah', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Jawa Timur', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'DI Yogyakarta', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Bali', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Nusa Tenggara Barat', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Nusa Tenggara Timur', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Kalimantan Barat', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Kalimantan Selatan', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Kalimantan Tengah', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Kalimantan Timur', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Kalimantan Utara', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Gorontalo', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sulawesi Selatan', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sulawesi Tenggara', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sulawesi Tengah', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sulawesi Utara', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Sulawesi Barat', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Maluku', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Maluku Utara', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Papua', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }, {
        province_name: 'Papua Barat', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('provinces');
  }
};