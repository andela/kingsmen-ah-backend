module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Followers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    followerId: {
      type: Sequelize.INTEGER
    },
    followingId: {
      type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('Followers')
};
