module.exports = function(sequelize, DataTypes) {

  var Flavor = sequelize.define("Flavor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: DataTypes.STRING,
    checked:DataTypes.BOOLEAN,
    icon:DataTypes.BOOLEAN
  }, {
    
    underscored: true,
    timestamps:false,
    tableName: "flavors",
    classMethods: {
/*
      associate: function(models) {
        Used for creating inner joins
       
      }*/
    }
  });

  return Flavor;
}; 