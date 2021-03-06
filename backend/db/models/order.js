'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    padId: DataTypes.INTEGER,
    totalCost: DataTypes.DECIMAL(10,2),
    orderStart: DataTypes.DATE,
    orderEnd: DataTypes.DATE
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.belongsTo(models.Pal, { foreignKey: 'palId' });
  };
  return Order;
};
