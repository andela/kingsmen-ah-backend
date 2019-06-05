'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportArticle = sequelize.define('ReportArticle', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    report: DataTypes.TEXT
  }, {});
  ReportArticle.associate = function(models) {
    // associations can be defined here
  };
  return ReportArticle;
};