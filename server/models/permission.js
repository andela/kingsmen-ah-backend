'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    access: DataTypes.ARRAY
  }, {});
  Permission.associate = function(models) {
    // associations can be defined here
  };
  return Permission;
};