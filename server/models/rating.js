module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ratings: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Rating.associate = (models) => {
    const { User, Article } = models;

    Rating.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Rating.belongsTo(Article, {
      foreignKey: 'articleId',
      as: 'article',
    });
  };

  return Rating;
};
