const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

function randomRating(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// const seedUsers = num => {
//     let i = 0;
//     while (i < num) {
//         const review = {
//             email: faker.internet.email(),
//             username: '',
//             hashedPassword: '',
//             nickname: '',
//             gender: '',
//             bio: faker.lorem.words(40),
//             profilePic: faker.image.people(200, 200, false),
//             createdAt: '',
//             updatedAt: '',

//         }

//         console.log(review, ',')
//         i++;
//     }
// }

// seedUsers(20)
//   collectionId: randomRating(1, 3),

const seedPals = num => {
      let i = 0;
      while (i < num) {
          const review = {
              title: faker.lorem.characters(number: 25),
          }

          console.log(review, ',')
          i++;
      }
    }

seedPals(30)
