'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pal = sequelize.define('Pal', {
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    server: DataTypes.STRING(30),
    rank: DataTypes.STRING(30),
    position: DataTypes.STRING(30),
    style: DataTypes.STRING(30),
    gameStatsPic: DataTypes.STRING,
    nickname: DataTypes.STRING(30),
    title: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    palPic: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    address: DataTypes.STRING(30),
    city: DataTypes.STRING(30),
    state: DataTypes.STRING(30),
    country: DataTypes.STRING(30),
  }, {});
  Pal.associate = function(models) {
    // associations can be defined here
    Pal.belongsTo(models.User, { foreignKey: 'userId' });
    Pal.hasMany(models.Review, { foreignKey: 'palId' });
    Pal.hasMany(models.Order, { foreignKey: 'palId' });
    Pal.belongsTo(models.Game, { foreignKey: 'gameId' });
  };
  return Pal;
};
