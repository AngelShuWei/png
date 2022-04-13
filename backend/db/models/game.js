'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    gameName: DataTypes.STRING,
    gamePic: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
