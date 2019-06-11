module.exports = (sequelize, DataTypes) => {
  const DroppedToken = sequelize.define('DroppedToken', {
    token: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  // DroppedToken.associate = (models) => {
  //   // associations can be defined here
  // };
  return DroppedToken;
};
