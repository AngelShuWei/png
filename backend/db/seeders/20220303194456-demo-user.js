'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        gender: 'Nonconforming',
        bio: 'Hi everyone! I am the demo user',
        profilePic: 'https://en.meming.world/images/en/thumb/b/b9/Cursed_Cat.jpg/300px-Cursed_Cat.jpg',
      },
      {
        email: 'angel@user.io',
        username: 'Angle',
        hashedPassword: bcrypt.hashSync('password'),
        gender: 'Female',
        bio: 'Hi my name angle',
        profilePic: 'https://i1.sndcdn.com/avatars-vzVavnrNStPmzryz-P4cGOw-t500x500.jpg',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'Angle'] }
    }, {});
  }
};
