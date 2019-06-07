module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    readTime: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Article.associate = (models) => {
    const {
      User, ArticleLike, Favourite, Rating, Comment, Tag, ReportArticle
    } = models;
    Article.belongsTo(User, {
      foreignKey: 'userId'
    });

    Article.hasMany(ArticleLike, {
      foreignKey: 'articleId',
    });

    Article.hasMany(Favourite, {
      foreignKey: 'articleId',
    });

    Article.hasMany(Rating, {
      foreignKey: 'articleId',
    });

    Article.hasMany(Comment, {
      foreignKey: 'articleId',
    });

    Article.hasMany(ReportArticle, {
      foreignKey: 'articleId'
    });

    Article.hasMany(Tag, {
      foreignKey: 'articleId'
    });
  };
  return Article;
};
