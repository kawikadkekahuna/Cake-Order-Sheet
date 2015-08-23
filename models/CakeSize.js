module.exports = function(sequelize, DataTypes) {

  var CakeSize = sequelize.define("CakeSize", {
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
    tableName: "cake_size",
    classMethods: {

      // associate: function(models) {
      // }
    }
  });

  return CakeSize;
}; 