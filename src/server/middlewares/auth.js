const jwt = require("jsonwebtoken");
const customError = require("../../utils/customError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization.includes("Bearer ")) {
      const error = customError(401, "Unauthorized", "token missing");
      next(error);
    }

    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;

    next();
  } catch {
    const error = customError(401, "Unauthorized", "invalid token");
    next(error);
  }
};

module.exports = auth;
