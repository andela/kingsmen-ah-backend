import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

// eslint-disable-next-line radix
const SALT_ROUNDS = parseInt(process.env.SALT);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    favorites: DataTypes.INTEGER,
    following: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: user => User.hashPassword(user),
      beforeUpdate: user => User.hashPassword(user)
    }
  });
  User.associate = (models) => {
    // associations can be defined here
  };

  User.hashPassword = async (user) => {
    const hash = await bcrypt.hashSync(user.password, SALT_ROUNDS);
    await user.setDataValue('password', hash);
  };

  return User;
};