'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pals', [
    {
      userId: 1,
      gameId: 1,
      nickname: "demo",
      title: 'Please be my friend',
      description: "Hello my name is Demo and welcome to my page!",
      price: 2.50,
      maxGuests: 2,
      address: "6736 S Sherbourne Dr",
      city: "Los Angeles",
      state: "CA",
      country: "United States",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      gameId: 2,
      nickname: "angle",
      title: "Book me, I'm cool",
      description: "My name is Angel and this is my description",
      price: 5.00,
      maxGuests: 1,
      address: "5723 Morgan Ave",
      city: "Los Angeles",
      state: "CA",
      country: "United States",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pals', null, {});
  }
};
