'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersPermission = sequelize.define('UsersPermission', {
    userId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {});
  UsersPermission.associate = function(models) {
    // associations can be defined here
  };
  return UsersPermission;
};