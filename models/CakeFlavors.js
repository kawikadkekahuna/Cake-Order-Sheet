module.exports = function(sequelize, DataTypes) {

  var CakeFlavors = sequelize.define("CakeFlavors", {
    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    flavor:DataTypes.STRING

  }, {
    timestamps:false,
    underscored: true,
    tableName: "cake_flavors",
    classMethods: {

      // associate: function(models) {

      // }
    }
  });

  return CakeFlavors;
};