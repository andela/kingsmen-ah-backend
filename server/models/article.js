'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    userId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    readTime: DataTypes.STRING
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};