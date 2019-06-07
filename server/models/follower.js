module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Follower.associate = (models) => {
    const { User } = models;

    Follower.belongsTo(User, {
      foreignKey: 'followingId'
    });

    Follower.belongsTo(User, {
      foreignKey: 'followerId'
    });
  };

  return Follower;
};
