module.exports = function(sequelize, DataTypes) {

  var PresetMessages = sequelize.define("PresetMessages", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    text: DataTypes.STRING


  }, {
    timestamps:false,
    underscored: true,
    tableName: "preset_messages",
    classMethods: {
/*
      associate: function(models) {
        Used for creating inner joins
       
      }*/
    }
  });

  return PresetMessages;
}; 