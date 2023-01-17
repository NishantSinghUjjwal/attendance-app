const express = require("express");
const router = express.Router();
const UserService = require("../services/users.service");
const authToken = require("../middlewares/auth.middleware");

router.post("/register", async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    const response = {};
    response.payload = user;
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

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserService.login(req.body);
    const response = {};
    response.payload = user;
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

router.post("/fetch-user-data", async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserService.fetchUserData(req.body);
    const response = {};
    response.payload = user;
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
