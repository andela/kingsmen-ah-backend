module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Favourite.associate = (models) => {
    const { User, Article } = models;

    Favourite.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });

    Favourite.belongsTo(Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE'
    });
  };

  return Favourite;
};
