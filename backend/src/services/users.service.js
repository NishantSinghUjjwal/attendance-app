const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/users.model");

class UserService {
  async register(user) {
    try {
      const salt = bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(user.password, salt);

      const response = UserModel.add(user);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserService();
