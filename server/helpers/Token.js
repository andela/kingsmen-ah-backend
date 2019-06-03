import jwt from 'jsonwebtoken';
/**
 * @class Token
 */
class Token {
  /**
   * @static
   * @param {user} user object from the database
   * @returns {string} returns thetoken
   * @memberof Token
   */
  static async create(user) {
    const { id, email } = user;
    const token = await jwt.sign({
      userId: id,
      email,
    }, process.env.SECRET);
    return token;
  }
}
export default Token;
