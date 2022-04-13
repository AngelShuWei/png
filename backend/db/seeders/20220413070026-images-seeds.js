'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        palId: 1,
        url: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 1,
        url: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/136767372/original/293f4b6c2f74cff0d5b543bc2c5f6007898d0444/give-you-coaching-from-a-challenger-player-in-league.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 1,
        url: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 1,
        url: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 1,
        url: "https://global-oss.epal.gg/image/ablum/16476144978226611.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        url: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/11/gal-gadot-2000.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        url: "https://pbs.twimg.com/media/FHeHZ1QXoAo2OS8?format=jpg&name=large",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        url: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        url: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        url: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
