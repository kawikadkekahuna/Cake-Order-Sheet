module.exports = function(sequelize, DataTypes) {

  var Quantity = sequelize.define("Quantity", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    text: DataTypes.STRING

  }, {
    timestamps:false,
    underscored: true,
    tableName: "quantity",
    classMethods: {
/*
      associate: function(models) {
        Used for creating inner joins
       
      }*/
    }
  });

  return Quantity;
}; 