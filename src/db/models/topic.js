'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {

    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});

  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
     foreignKey: "topicId",
     as: "banners",
   });

   Topic.hasMany(models.Rule, {
    foreignKey: "topicId",
    as: "rules",
   });

   Topic.hasMany(models.Add, {
     foreignKey:"topicId",
     as: "adds",
   });
  };
  return Topic;
};
