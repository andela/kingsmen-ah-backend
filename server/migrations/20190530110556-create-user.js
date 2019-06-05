module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    middlename: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    username: {
      type: Sequelize.CITEXT,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.CITEXT,
      unique: true,
      allowNull: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
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
  down: queryInterface => queryInterface.dropTable('Users')
};
