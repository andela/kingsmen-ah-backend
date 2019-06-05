'use strict';
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    userId: DataTypes.INTEGER,
    interest: DataTypes.STRING
  }, {});
  Interest.associate = function(models) {
    // associations can be defined here
  };
  return Interest;
};