const bcrypt = require("bcrypt");

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

  async login(user) {
    const userDB = await UserModel.get(user);
    if (!userDB) return { allow_login: false };
    const flag = bcrypt.compareSync(user.password, userDB.password);
    if (flag) {
      userDB.password = undefined;
      return { user: userDB, allow_login: true };
    } else {
      return { allow_login: false };
    }
  }
}

module.exports = new UserService();
