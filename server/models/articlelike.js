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

    Comment.belongsTo(Article, {
      foreignKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
    });

    Comment.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };

  return ArticleLike;
};
