module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('apilogs', 'method', { type: Sequelize.STRING });
    await queryInterface.addColumn('apilogs', 'statusCode', { type: Sequelize.INTEGER });
    await queryInterface.addColumn('apilogs', 'ip', { type: Sequelize.STRING });
    await queryInterface.addColumn('apilogs', 'headers', { type: Sequelize.JSON });
    await queryInterface.addColumn('apilogs', 'query', { type: Sequelize.JSON });
    await queryInterface.addColumn('apilogs', 'durationMs', { type: Sequelize.INTEGER });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('apilogs', 'method');
    await queryInterface.removeColumn('apilogs', 'statusCode');
    await queryInterface.removeColumn('apilogs', 'ip');
    await queryInterface.removeColumn('apilogs', 'headers');
    await queryInterface.removeColumn('apilogs', 'query');
    await queryInterface.removeColumn('apilogs', 'durationMs');
  },
};
