const mongoose = require("mongoose");

const Schema = {
  first_name: {
    type: String,
    required: true,
    index: true,
  },
  last_name: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  role: { type: String },
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
    return response;
  }
}

module.exports = new UserModel();
