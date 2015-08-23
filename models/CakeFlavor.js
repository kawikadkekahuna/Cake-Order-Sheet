module.exports = function(sequelize, DataTypes) {

  var CakeFlavor = sequelize.define("CakeFlavor", {
    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text:DataTypes.STRING,
    checked:DataTypes.BOOLEAN,
    icon:DataTypes.BOOLEAN

  }, {
    timestamps:false,
    underscored: true,
    tableName: "cake_flavor",
    classMethods: {

      // associate: function(models) {

      // }
    }
  });

  return CakeFlavor;
};