module.exports = function(sequelize, DataTypes) {

  var MessageColor = sequelize.define("MessageColor", {

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
    tableName: "message_colors",
    classMethods: {
/*
      associate: function(models) {
        Used for creating inner joins
       
      }*/
    }
  });

  return MessageColor;
}; 