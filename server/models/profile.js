module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});

  Profile.associate = (models) => {
    const { User } = models;

    Profile.belongsTo(User, {
      foreignKey: 'userId',
    });
  };

  return Profile;
};
