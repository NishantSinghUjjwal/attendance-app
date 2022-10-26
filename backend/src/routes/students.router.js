const express = require("express");
const router = express.Router();
const StudentService = require("../services/students.service");

router.post("/add-Student", async (req, res) => {
  try {
    const student = await StudentService.add(req.body);
    const response = {};
    response.payload = student;
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

router.get("/fetch-by-class", async (req, res) => {
  try {
    const student = await StudentService.getAllByClass(req.body);
    const response = {};
    response.payload = student;
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

router.get("/fetch-by-roll", async (req, res) => {
  try {
    const students = await StudentService.getByRoll(req.body);
    const response = {};
    if (students) response.payload = students;
    else response.payload = [];
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
