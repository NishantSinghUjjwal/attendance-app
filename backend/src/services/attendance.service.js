const bcrypt = require("bcrypt");

const AttendanceModel = require("../models/attendance.model");

class AttendanceService {
  async addAttendance(attendance) {
    try {
      const response = AttendanceModel.add(attendance);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AttendanceService();
