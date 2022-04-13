'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('People', [
      {
        gameName: "League of Legends",
        platform: "PC",
        server: "NA",
        rank: "Challenger",
        position: "ADC",
        style: "Try Hard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameName: "Apex Legends",
        platform: "PC",
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
    return queryInterface.bulkDelete('Games', null, {});
  }
};
