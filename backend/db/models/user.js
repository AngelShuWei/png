'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    nickname: DataTypes.STRING(30),
    gender: DataTypes.STRING,
    bio: DataTypes.TEXT,
    profilePic: DataTypes.STRING,
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  //return an obj with only the User instance info that is safe to save to a JWT
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email, nickname, profilePic, gender, bio } = this; // context will be the User instance
    return { id, username, email, nickname, profilePic, gender, bio };
  };

  User.prototype.validatePassword = function (password) { //should accept password string and return true if there is a match w/ user instance's hashedpw and return false otherwise
  return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

  User.login = async function ({ credential, password }) {
  const { Op } = require('sequelize');
  const user = await User.scope('loginUser').findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential
      }
    }
  });
  if (user && user.validatePassword(password)) { //if use found, then method should validate pw by pasing it into instance .validatepw method
    return await User.scope('currentUser').findByPk(user.id); //if pw valid, mehtod should return uer by uing currentUser scope
  }
};

  User.signup = async function ({ username, email, password, nickname, bio, gender, profilePic}) {
    const hashedPassword = bcrypt.hashSync(password); //hash the pw using hashSync
    const user = await User.create({
      username,
      email,
      hashedPassword,
      nickname,
      bio,
      gender,
      profilePic,
    });
    return await User.scope('currentUser').findByPk(user.id); //return created user using cuurrentUserscope
  };

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Review, { foreignKey: 'userId' });
    User.hasMany(models.Pal, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
  };

  return User;
};
