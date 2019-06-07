module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    access: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Permission.associate = (models) => {
    const { User, Role } = models;

    Permission.belongsToMany(User, {
      through: 'UsersPermission',
      as: 'users',
      foreignKey: 'permissionId'
    });

    Permission.belongsToMany(Role, {
      through: 'PermissionRoles',
      as: 'roles',
      foreignKey: 'permissionId'
    });
  };

  return Permission;
};
