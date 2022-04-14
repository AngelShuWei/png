'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GameStats', [
      {
        palId: 1,
        gameId: 1,
        server: "NA",
        rank: "Diamond",
        position: "ADC",
        style: "Try Hard",
        gameStatsPic: "https://global-oss.epal.gg/image/ablum/16243402695185694.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        gameId: 2,
        server: "NA",
        rank: "Master",
        position: "Assault",
        style: "Flanker",
        gameStatsPic: "https://global-oss.epal.gg/image/ablum/16434205654971271.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GameStats', null, {});
  }
};
