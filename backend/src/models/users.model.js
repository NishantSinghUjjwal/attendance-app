const mongoose = require("mongoose");

const Schema = {
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  subject: [
    {
      type: String,
      required: true,
    },
  ],
  password: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    required: true,
    default: false,
  },
};

class UserModel {
  model;

  constructor() {
    const UserSchema = new mongoose.Schema(Schema);
    this.model = mongoose.model("Users", UserSchema);
  }

  async add(user) {
    const userModel = new this.model(user);
    const response = await userModel.save();
    response.password = undefined;
    return response;
  }

  async get(user) {
    console.log(user);
    const users = await this.model.findOne({
      username: user.username,
    });
    console.log(users);
    return users;
  }
}

module.exports = new UserModel();
