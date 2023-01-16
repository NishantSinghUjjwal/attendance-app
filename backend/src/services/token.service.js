const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appConst = require("../constants/app.constant");

class TokenService {
  async fetchToken(user) {
    try {
      const response = {};
      const token = jwt.sign(user, appConst.privateSecretKey, {
        expiresIn: 60 * 60,
      });
      response.token = token;
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new TokenService();
