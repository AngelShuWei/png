'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pal = sequelize.define('Pal', {
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    nickname: DataTypes.STRING(30),
    title: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10,2),
    maxGuests: DataTypes.INTEGER,
    address: DataTypes.STRING(30),
    city: DataTypes.STRING(30),
    state: DataTypes.STRING(30),
    country: DataTypes.STRING(30),
  }, {});
  Pal.associate = function(models) {
    // associations can be defined here
  };
  return Pal;
};
