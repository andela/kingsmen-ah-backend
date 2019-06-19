module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LikeArticle', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
  }),
  down: queryInterface => queryInterface.dropTable('LikeArticle')
};
