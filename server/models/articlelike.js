module.exports = (sequelize, DataTypes) => {
  const ArticleLike = sequelize.define('ArticleLike', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  ArticleLike.associate = (models) => {
    const { User, Article } = models;

    ArticleLike.belongsTo(Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });

    ArticleLike.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };

  return ArticleLike;
};
