module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'desc', {
    allowNull: true,
    type: Sequelize.STRING
  }),
  down: queryInterface => queryInterface.removeColumn('Articles', 'desc')
};
