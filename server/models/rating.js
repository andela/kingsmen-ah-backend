'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    ratings: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};