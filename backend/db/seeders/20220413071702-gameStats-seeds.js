'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GameStats', [
      {
        palId: 1,
        gameId: 1,
        server: "NA",
        rank: "Challenger",
        position: "ADC",
        style: "Try Hard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        gameId: 2,
        server: "NA",
        rank: "Diamond",
        position: "Support",
        style: "Flexible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GameStats', null, {});
  }
};
