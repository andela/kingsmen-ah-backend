module.exports = (sequelize, DataTypes) => {
  const UsersPermission = sequelize.define('UsersPermission', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  UsersPermission.associate = (models) => {
    const { User, Permission } = models;

    UsersPermission.belongsTo(User, {
      foreignKey: 'userId'
    });

    UsersPermission.belongsTo(Permission, {
      foreignKey: 'permissionId'
    });
  };

  return UsersPermission;
};
