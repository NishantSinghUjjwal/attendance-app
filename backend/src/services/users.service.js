const bcrypt = require("bcrypt");
const appConst = require("../constants/app.constant");
const moment = require("moment");
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

  async login(user) {
    const userDB = await UserModel.get(user);
    if (!userDB) return { data: {}, allow_login: false };
    const flag = bcrypt.compareSync(user.password, userDB.password);
    console.log("THE FLAG IN LOGIN : ", flag);
    if (flag) {
      try {
        user.expireAt = moment().add(1, "hours");
        const token = jwt.sign(user, appConst.privateSecretKey, {
          expiresIn: 60 * 60,
        });
        console.log(token);
        user.access_token = token;
        console.log(token);
        console.log(token);
        return { user: userDB, allow_login: true };
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      return { data: {}, allow_login: false };
    }
  }
}

module.exports = new UserService();
