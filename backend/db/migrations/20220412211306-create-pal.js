'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      game: {
        type: Sequelize.STRING(30),
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
      start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      guests: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      country: {
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
    return queryInterface.dropTable('Pals');
  }
};
