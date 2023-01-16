const express = require("express");
const router = express.Router();
const TokenService = require("../services/token.service");

router.get("/fetch-token", async (req, res) => {
  try {
    const data = await TokenService.fetchToken(req.body);
    const response = {};
    response.payload = data;
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
