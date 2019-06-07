module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    body: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Comments')
};
