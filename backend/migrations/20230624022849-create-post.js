'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.ENUM('Tìm kiếm','Trao tặng','Trao đổi'),
      },
      priority: {
        type: Sequelize.ENUM('1','2','3','4'),
      },
      post_content: {
        type: Sequelize.STRING
      },
     status_gift: {
        type: Sequelize.BOOLEAN
      },
      title: {
        type: Sequelize.STRING
      },
      citycode: {
        type: Sequelize.INTEGER
      },
      districtcode: {
        type: Sequelize.INTEGER
      },
      communecode: {
        type: Sequelize.INTEGER
      },
      longtitube: {
        type: Sequelize.DOUBLE
      },
      latitube: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};