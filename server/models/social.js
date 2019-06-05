'use strict';
module.exports = (sequelize, DataTypes) => {
  const Social = sequelize.define('Social', {
    userId: DataTypes.INTEGER,
    socialUrl: DataTypes.STRING
  }, {});
  Social.associate = function(models) {
    // associations can be defined here
  };
  return Social;
};