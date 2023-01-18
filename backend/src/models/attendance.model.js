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

  async getStudentReport(params) {
    var attendances = await this.model.find({ delete: false });
    console.log(attendances);
    var result = [];
    for (let i = 0; i < attendances?.length; i++) {
      console.log(
        attendances[i]?.att_date?.getMonth(),
        " year ",
        attendances[i]?.att_date?.getFullYear()
      );
      if (
        attendances[i]?.att_date?.getMonth() == params?.month &&
        attendances[i]?.att_date?.getFullYear() == params?.year &&
        attendances[i]?.att_subject == params?.sub
      ) {
        result.push({
          absent: attendances[i]?.attendance?.absent,
          present: attendances[i]?.attendance.present,
          day: attendances[i]?.att_date?.getUTCDate(),
          month: attendances[i]?.att_date?.getMonth(),
          year: attendances[i].att_date?.getFullYear(),
          subject: attendances[i]?.att_subject,
        });
      }
    }
    var presentee = 0;
    var absentee = 0;
    console.log(result);
    if (result?.length != 0) {
      for (let j = 0; j < result?.length; j++) {
        for (let k = 0; k < result[j]?.present?.length; k++) {
          if (result[j]?.present[k] == params?.roll) {
            presentee = presentee + 1;
          }
        }
        for (let l = 0; l < result[j]?.absent?.length; l++) {
          if (result[j]?.absent[l] == params?.roll) {
            absentee = absentee + 1;
          }
        }
      }
      console.log(presentee);
      console.log(absentee);
      let student_report = {
        std_roll: params?.roll,
        subject: params?.sub,
        month: params?.month,
        year: params?.year,
        absent: absentee,
        present: presentee,
      };
      return student_report;
    } else {
      return { msg: "No Record Found" };
    }
  }
}

module.exports = new AttendanceModel();
