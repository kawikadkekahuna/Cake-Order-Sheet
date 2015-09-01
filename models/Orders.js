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
    phone: DataTypes.STRING,
    pickup_date: DataTypes.STRING,
    pickup_time: DataTypes.STRING,
    paid_status: DataTypes.BOOLEAN,
    order_processed: DataTypes.STRING,
    message:DataTypes.STRING,
    design:DataTypes.STRING,
    message_color:DataTypes.STRING,
    other_message:DataTypes.STRING,
    frosting_color:DataTypes.STRING,
    completed:DataTypes.BOOLEAN,
    cake_status:DataTypes.STRING


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