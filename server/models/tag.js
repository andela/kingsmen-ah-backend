module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Tag.associate = (models) => {
    const { Article } = models;

    Tag.belongsTo(Article, {
      foreignKey: 'articleId',
      as: 'articles'
    });
  };

  return Tag;
};
