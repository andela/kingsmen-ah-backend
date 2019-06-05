'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleLike = sequelize.define('ArticleLike', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  ArticleLike.associate = function(models) {
    // associations can be defined here
  };
  return ArticleLike;
};