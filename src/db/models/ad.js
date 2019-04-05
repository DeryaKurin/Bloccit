'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ad = sequelize.define('Ad', {
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
  }, {});
  Ad.associate = function(models) {
    // associations can be defined here
    Ad.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Ad;
};
