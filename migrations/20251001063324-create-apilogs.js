'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('apilogs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      requestUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payload: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      response: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('apilogs');
  },
};

