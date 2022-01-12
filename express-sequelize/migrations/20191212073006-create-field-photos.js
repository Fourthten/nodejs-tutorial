'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('field_photos', {
        photo_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT(20)
        },
        field_id: {
          allowNull: false,
          references: {
            model: 'fields',
            key: 'field_id'
          },
          type: Sequelize.INTEGER(11)
        },
        url: {
          type: Sequelize.STRING(255)
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
      await queryInterface.bulkInsert('field_photos', [{
        field_id: 1,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCwVxH6-AwFcyVlzOO4_YKWfisPAeZD37oA4gffx8b84wAGRbC',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        field_id: 2,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmi3nR4B_JNC-v6ZTfT_oCIuSbq4NYgMbLAFZND4Tf6jmOmmj9',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        field_id: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyIpJx2uCuPbhnMoStuiGky3D5pRoIM3VadqHVMfyGZXCC2PSB',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('field_photos');
  }
};