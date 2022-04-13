'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Games', [
      {
        gameName: "League of Legends",
        gamePic: "https://static-oss.epal.gg/data/static/img6_card_lol@2x1642767818531.png?x-oss-process=image/resize,w_200",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameName: "Apex Legends",
        gamePic: "https://static-oss.epal.gg/data/static/card_Apex@2x.png?x-oss-process=image/resize,w_200",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameName: "Valorant",
        gamePic: "https://static-oss.epal.gg/data/static/card_valorant@2x.png?x-oss-process=image/resize,w_200",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {});
  }
};
