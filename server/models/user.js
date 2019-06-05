import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const SALT_ROUNDS = Number(process.env.SALT);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.CITEXT,
    email: DataTypes.CITEXT,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: user => User.hashPassword(user),
      beforeUpdate: user => User.hashPassword(user)
    }
  });
  // User.associate = (models) => {
  //   // associations can be defined here
  // };

  User.hashPassword = async (user) => {
    const hash = await bcrypt.hash(user.dataValues.password, SALT_ROUNDS);
    await user.setDataValue('password', hash);
  };

  return User;
};
