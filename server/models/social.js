module.exports = (sequelize, DataTypes) => {
  const Social = sequelize.define('Social', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    socialUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});

  Social.associate = (models) => {
    const { User } = models;

    Social.belongsTo(User, {
      foreignKey: 'userId'
    });
  };

  return Social;
};
