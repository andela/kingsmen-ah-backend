'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    articleId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};