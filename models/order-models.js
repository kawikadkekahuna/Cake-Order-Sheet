module.exports = function(sequelize, DataTypes) {

  var Order = sequelize.define("Order", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    quantity: DataTypes.INTEGER,
    size: DataTypes.STRING,
    icecream_flavors: DataTypes.STRING,
    cake_flavor: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    pickup_date: DataTypes.STRING,

  }, {
    underscored: true,
    tableName: "orders",
    classMethods: {
/*
      associate: function(models) {
        Used for creating inner joins
       
      }*/
    }
  });

  return Order;
}; 