'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    gameName: DataTypes.STRING(30),
    platform: DataTypes.STRING(30),
    server: DataTypes.STRING(30),
    rank: DataTypes.STRING(30),
    position: DataTypes.STRING(30),
    style: DataTypes.STRING(30)
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
