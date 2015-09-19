module.exports = function(sequelize, DataTypes) {

  var CakeSizes = sequelize.define("CakeSizes", {
    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    icon: DataTypes.BOOLEAN
  }, {
    timestamps:false,
    underscored: true,
    tableName: "cake_sizes",
    classMethods: {

      // associate: function(models) {
      // }
    }
  });

  return CakeSizes;
}; 