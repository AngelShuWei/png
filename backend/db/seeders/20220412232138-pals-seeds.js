'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pal', [
    {
      userId: 1,
      nickname: "demo",
      title: 'Please be my friend',
      description: "Hello my name is Demo and welcome to my page!",
      game: "Valorant",
      server: "United States",
      rank: "Radiant",
      position: "Duelist",
      style: "Game",
      start: ,
      end: ,
      price: ,
      guests: ,
      address: "",
      city: "",
      state: "CA",
      country: "United States",
    },
    {
      userId: 2,
      nickname: angle,
      title: "",
      description: "",
      game: "Apex Legends",
      server: "",
      rank: "Silver",
      position: "Support",
      style: "Game",
      start: ,
      end: ,
      price: ,
      guests: ,
      address: "",
      city: "",
      state: "CA",
      country: "United States",
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
