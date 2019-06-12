import Token from '../../helpers/Token';

const generateToken = async (userDetails) => {
  const token = await Token.getToken(userDetails);
  return token;
};

export default generateToken;
