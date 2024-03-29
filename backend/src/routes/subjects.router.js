const express = require("express");
const router = express.Router();
const SubjectService = require("../services/subjects.service");
const authToken = require("../middlewares/auth.middleware");

router.post("/add-subject", async (req, res) => {
  try {
    const subject = await SubjectService.add(req.body);
    const response = {};
    response.payload = subject;
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

router.get("/fetch-subject", async (req, res) => {
  try {
    const subject = await SubjectService.getByCode(req.body);
    const response = {};
    response.payload = subject;
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

router.get(
  "/fetch-subject-list",

  async (req, res) => {
    try {
      const subjects = await SubjectService.getList();
      const response = {};
      response.payload = subjects;
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
  }
);

router.post(
  "/edit-subject",

  async (req, res) => {
    try {
      const subjects = await SubjectService.editSubject(req.body);
      const response = {};
      response.payload = subjects;
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
  }
);

module.exports = router;
