const express = require("express");
const router = express.Router();
const UserService = require("../services/users.service");

router.post("/register", async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    const response = {};
    response.data = user;
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
