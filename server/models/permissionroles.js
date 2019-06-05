'use strict';
module.exports = (sequelize, DataTypes) => {
  const PermissionRoles = sequelize.define('PermissionRoles', {
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {});
  PermissionRoles.associate = function(models) {
    // associations can be defined here
  };
  return PermissionRoles;
};