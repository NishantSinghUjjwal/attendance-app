const express = require("express");
const router = express.Router();
const AttendanceService = require("../services/attendance.service");

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

module.exports = router;
