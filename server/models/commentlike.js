'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  CommentLike.associate = function(models) {
    // associations can be defined here
  };
  return CommentLike;
};