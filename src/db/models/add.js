'use strict';
module.exports = (sequelize, DataTypes) => {
  var Add = sequelize.define('Add', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "Topic",
      key: "id",
      as: "topicId",
     }
   }
 } , {});
  Add.associate = function(models) {
    // associations can be defined here
    Add.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Add;
};
