import models from '@models';
import faker from 'faker';
import Token from '../../helpers/Token';

const { User } = models;

const generateToken = async (userDetails) => {
  const token = await Token.create(userDetails);
  return token;
};

const createTestUser = async () => {
  const newUser = await User.create({
    id: faker.random.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  });
  const authToken = await generateToken({ id: newUser.id });

  return authToken;
};

export default createTestUser;
