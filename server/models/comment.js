module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});

  Comment.associate = (models) => {
    const { Article, User, CommentLike } = models;

    Comment.belongsTo(Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });

    Comment.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Comment.hasMany(CommentLike, {
      foreignKey: 'commentId'
    });
  };

  return Comment;
};
