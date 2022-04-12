'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pal = sequelize.define('Pal', {
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING(30),
    title: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    game: DataTypes.STRING(30),
    server: DataTypes.STRING(30),
    rank: DataTypes.STRING(30),
    position: DataTypes.STRING(30),
    role: DataTypes.STRING(30),
    style: DataTypes.STRING(30),
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    price: DataTypes.DECIMAL(10,2),
    guests: DataTypes.INTEGER,
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
