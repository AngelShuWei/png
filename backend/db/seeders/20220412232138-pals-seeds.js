'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pals', [
    {
      userId: 1,
      gameId: 1,
      server: "NA",
      rank: "Diamond",
      position: "ADC",
      style: "Try Hard",
      gameStatsPic: "https://global-oss.epal.gg/image/ablum/16243402695185694.jpg",
      nickname: "demo",
      title: 'Please be my friend',
      description: "Hello my name is Demo and welcome to my page!",
      palPic: "https://www.hollywoodreporter.com/wp-content/uploads/2021/05/GettyImages-1191359874-H-2021-1620057278.jpg",
      price: 2.50,
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
      server: "NA",
      rank: "Master",
      position: "Assault",
      style: "Flanker",
      gameStatsPic: "https://global-oss.epal.gg/image/ablum/16434205654971271.jpg",
      nickname: "angle",
      title: "Book me, I'm cool",
      description: "My name is Angel and this is my description",
      palPic: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/11/gal-gadot-2000.jpg",
      price: 5.00,
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
