const mongoose = require("mongoose");

const Schema = {
  sub_name: {
    type: String,
    required: true,
  },
  sub_code: {
    type: String,
    required: true,
  },
  sub_degree: {
    type: String,
    required: true,
  },
  sub_course: {
    type: String,
    required: true,
  },
  sub_year: {
    type: Number,
    required: true,
  },
  delete: {
    type: Boolean,
    required: true,
    default: false,
  },
};

class SubjectModel {
  model;

  constructor() {
    const subjectSchema = new mongoose.Schema(Schema);
    this.model = mongoose.model("subjects", subjectSchema);
  }

  async add(subject) {
    const SubjectModel = new this.model(subject);
    const response = await SubjectModel.save();
    return response;
  }

  async getByCode(sub_code) {
    const subject = await this.model.findOne({
      sub_code: sub_code,
    });
    console.log(subject);
    return subject;
  }

  async getAll() {
    const subjects = await this.model.find({}, { sub_name: 1, sub_code: 1 });
    return subjects;
  }
}

module.exports = new SubjectModel();
