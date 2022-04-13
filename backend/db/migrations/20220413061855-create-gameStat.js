'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GameStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      palId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      server: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      rank: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      style: {
        type: Sequelize.STRING(30),
        allowNull: false,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GameStats');
  }
};
