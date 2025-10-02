'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'deleted_at', {
    type: Sequelize.DATE,
    allowNull: true,
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn('users', 'deleted_at');
}

