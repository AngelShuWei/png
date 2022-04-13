'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        palId: 1,
        content: "Never a dull moment",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        palId: 1,
        content: "Enjoyed the company thanks!",
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        palId: 1,
        content: "Would recommend 100%",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        palId: 2,
        content: "Made my day",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        palId: 2,
        content: "She said I play poorly, but at least she was cute",
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        palId: 2,
        content: "You made a new customer",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
