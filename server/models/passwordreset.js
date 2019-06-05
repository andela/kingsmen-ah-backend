'use strict';
module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    userId: DataTypes.INTEGER,
    resetPasswordoken: DataTypes.STRING,
    resetPasswordExpiry: DataTypes.INTEGER
  }, {});
  PasswordReset.associate = function(models) {
    // associations can be defined here
  };
  return PasswordReset;
};