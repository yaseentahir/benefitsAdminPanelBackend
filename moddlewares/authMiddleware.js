const CustomError = require("../helpers/customError");
const jwtHelper = require("../helpers/jwt");

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    throw new CustomError(
      401,
      "You dont have permission to perform this action"
    );
  }

  try {
    const decoded = jwtHelper.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
