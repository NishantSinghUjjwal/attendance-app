const jwt = require("jsonwebtoken");
const appConstant = require("../constants/app.constant");

module.exports.tokenValidation = function (req, res, next) {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer")) {
    var decoded = {};
    try {
      decoded = jwt.verify(
        authorization.split(" ")[1],
        appConstant.privateSecretKey
      );
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).send({
        error: error.message,
        success: false,
        datetime: new Date(),
      });
    }
  } else {
    res.status(401).send({
      error: "Invalid Authentication",
      success: false,
      datetime: new Date(),
    });
  }
};
