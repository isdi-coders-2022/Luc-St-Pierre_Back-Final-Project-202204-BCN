const loginValidationSchema = require("../../schemas/userSchemaValidation");

const loginValidation = (req, res, next) => {
  const payload = {
    userName: req.body.userName,
    password: req.body.password,
  };

  const { error } = loginValidationSchema.validate(payload);

  if (error) {
    error.statusCode = 409;
    error.customMessage = `Error in User data: ${error.message}`;
    next(error);
  }
  next();
};

module.exports = loginValidation;
