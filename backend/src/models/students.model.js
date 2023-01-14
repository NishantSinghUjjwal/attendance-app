const mongoose = require("mongoose");

const Schema = {
  roll_no: {
    type: Number,
    required: true,
    unique: true,
  },
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
  year: {
    type: Number,
    required: true,
  },
  std_class: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    required: true,
    default: false,
  },
};

class StudentModel {
  model;

  constructor() {
    const StudentSchema = new mongoose.Schema(Schema);
    this.model = mongoose.model("students", StudentSchema);
  }

  async add(student) {
    const StudentModel = new this.model(student);
    const response = await StudentModel.save();
    return response;
  }

  async getAllByClass(studentData) {
    const student = await this.model.find({
      std_class: studentData.std_class,
      year: studentData.year,
    });
    console.log(student);
    return student;
  }

  async getByRoll(studentData) {
    const students = await this.model.findOne({
      roll_no: studentData.roll_no,
      std_class: studentData.std_class,
      year: studentData.year,
    });
    return students;
  }

  async remove(studentData) {
    await this.model.deleteOne({
      roll_no: studentData.roll_no,
      std_class: studentData.std_class,
      year: studentData.year,
    });
    var students = this.getAllByClass(studentData);
    return students;
  }

  async update(studentData) {
    await this.model.updateOne(
      {
        roll_no: studentData.roll_no,
        std_class: studentData.std_class,
        year: studentData.year,
      },
      { ...studentData.changes }
    );
    var students = this.getAllByClass(studentData);
    return students;
  }
}

module.exports = new StudentModel();
