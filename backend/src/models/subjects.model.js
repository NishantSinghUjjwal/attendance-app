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
  sub_class: {
    type: String,
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

  async update(subjectData) {
    await this.model.updateOne(
      {
        sub_code: subjectData.changes.sub_code,
      },
      { ...subjectData.changes }
    );
    var subjects = this.getAll(subjectData);
    return subjects;
  }
}

module.exports = new SubjectModel();
