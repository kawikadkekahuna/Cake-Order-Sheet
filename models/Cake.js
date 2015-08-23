module.exports = function(sequelize, DataTypes) {

  var Cake = sequelize.define("Cake", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    design: DataTypes.STRING,
    size: DataTypes.STRING,
    flavor: DataTypes.STRING

  }, {
    underscored: true,
    tableName: "cakes",
    classMethods: {

      associate: function(models) {
    		Cake.hasOne(models.CakeSize);
    		Cake.hasOne(models.CakeFlavor)       
      }
    }
  });

  return Cake;
}; 