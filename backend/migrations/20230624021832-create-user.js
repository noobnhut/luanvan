'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(64)
      },
      password: {
        type: Sequelize.STRING(54)
      },
      address: {
        type: Sequelize.STRING(32)
      },
      phone: {
        type: Sequelize.STRING(10)
      },
      avatar: {
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
      ranking_score: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      notification_status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('users');
  }
};