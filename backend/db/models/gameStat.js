'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameStat = sequelize.define('GameStat', {
    palId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    server: DataTypes.STRING(30),
    rank: DataTypes.STRING(30),
    position: DataTypes.STRING(30),
    style: DataTypes.STRING(30),
    gameStatsPic: DataTypes.STRING,
  }, {});
  GameStat.associate = function(models) {
    // associations can be defined here
    GameStat.belongsTo(models.Pal, { foreignKey: 'palId' });
    GameStat.belongsTo(models.Game, { foreignKey: 'gameId' });
  };
  return GameStat;
};
