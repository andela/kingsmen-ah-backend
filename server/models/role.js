module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Role.associate = (models) => {
    const { Permission } = models;

    Role.belongsToMany(Permission, {
      through: 'PermissionRoles',
      as: 'permissions',
      foreignKey: 'roleId'
    });
  };

  return Role;
};
