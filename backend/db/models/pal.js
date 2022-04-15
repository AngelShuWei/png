'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pal = sequelize.define('Pal', {
    userId: DataTypes.INTEGER,
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
    Pal.hasMany(models.GameStat, { foreignKey: 'palId' });
    Pal.hasMany(models.Review, { foreignKey: 'palId' });
    Pal.hasMany(models.Order, { foreignKey: 'palId' });
  };
  return Pal;
};
