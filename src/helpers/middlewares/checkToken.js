const jwt = require("jsonwebtoken");
const form = require("../form");

module.exports = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken) {
    form.error(res, {
      msg: "Please Login First",
      status: 401,
    });
  } else {
    const token = bearerToken.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
      form.error(res, {
        msg: "Invalid Token",
        error,
        status: 401,
      });
    }
  }
};
