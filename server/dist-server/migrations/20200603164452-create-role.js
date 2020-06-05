'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
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
}

function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('Roles');
}