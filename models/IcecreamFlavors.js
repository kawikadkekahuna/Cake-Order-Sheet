module.exports = function(sequelize, DataTypes) {

  var IcecreamFlavors = sequelize.define("IcecreamFlavors", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    flavor: DataTypes.STRING
  }, {
    
    underscored: true,
    timestamps:false,
    tableName: "icecream_flavors",
    classMethods: {
/*
      associate: function(models) {
        Used for creating inner joins
       
      }*/
    }
  });

  return IcecreamFlavors;
}; 