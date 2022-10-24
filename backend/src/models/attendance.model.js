const { array } = require("joi");
const mongoose = require("mongoose");

const Schema = {
  att_date: {
    type: Date,
    required: true,
  },
  att_class: {
    type: String,
    required: true,
  },
  att_subject: {
    type: Number,
    required: true,
  },
  attendance: {
    present: [{ type: Number }],
    absent: [{ type: Number }],
  },
  att_year: {
    type: Number,
    required: true,
  },
  delete: {
    type: Boolean,
    required: true,
    default: false,
  },
};

class AttendanceModel {
  model;

  constructor() {
    const AttendanceSchema = new mongoose.Schema(Schema);
    this.model = mongoose.model("Attendances", AttendanceSchema);
  }

  async add(attendance) {
    const AttendanceModel = new this.model(attendance);
    const response = await AttendanceModel.save();
    return response;
  }

  // async getAll() {
  //   const Attendances = await this.model.find({}, { sub_name: 1, sub_code: 1 });
  //   return Attendances;
  // }
}

module.exports = new AttendanceModel();
