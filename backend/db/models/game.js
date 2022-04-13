'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    gameName: DataTypes.STRING,
    gamePic: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
    Game.hasMany(models.GameStat, { foreignKey: 'gameId' });
  };
  return Game;
};
