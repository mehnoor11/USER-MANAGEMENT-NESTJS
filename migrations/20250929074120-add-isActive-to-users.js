'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'isActive', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn('users', 'isActive');
}

