'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  Favourite.associate = function(models) {
    // associations can be defined here
  };
  return Favourite;
};