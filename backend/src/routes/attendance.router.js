const express = require("express");
const router = express.Router();
const AttendanceService = require("../services/attendance.service");
const authToken = require("../middlewares/auth.middleware");

router.post("/add-attendance", async (req, res) => {
  try {
    const attendance = await AttendanceService.addAttendance(req.body);
    const response = {};
    response.payload = attendance;
    response.success = true;
    response.datetime = new Date();
    res.send(response);
  } catch (err) {
    const response = {};
    response.error = err.message;
    response.success = true;
    response.datetime = new Date();
    res.status(500).send(response);
  }
});

router.post("/fetch-attendance-report", async (req, res) => {
  try {
    const attendance = await AttendanceService.getStudentReport(req.body);
    const response = {};
    response.payload = attendance;
    response.success = true;
    response.datetime = new Date();
    res.send(response);
  } catch (err) {
    const response = {};
    response.error = err.message;
    response.success = true;
    response.datetime = new Date();
    res.status(500).send(response);
  }
});

module.exports = router;
