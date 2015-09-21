module.exports = function(sequelize, DataTypes) {

  var MessageColors = sequelize.define("MessageColors", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    text: DataTypes.STRING

  }, {
    timestamps:false,
    underscored: true,
    tableName: "message_colors",
    classMethods: {
/*
      associate: function(models) {
        Used for creating inner joins
       
      }*/
    }
  });

  return MessageColors;
}; 