module.exports = function (sequelize, DataTypes) {

  var Order = sequelize.define("Order", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    icecream_flavor: DataTypes.STRING,
    cake_flavor: DataTypes.STRING,
    cake_size: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    frosting_color: DataTypes.STRING,
    order_design: DataTypes.STRING,
    message_color: DataTypes.STRING,
    additional_notes: DataTypes.STRING,
    order_message: DataTypes.STRING,
    order_paid: DataTypes.BOOLEAN,
    order_processed: DataTypes.STRING,
    pickup_date: DataTypes.STRING,
    pickup_time: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    cake_status: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    timestamps:false,
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