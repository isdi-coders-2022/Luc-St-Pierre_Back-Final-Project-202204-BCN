const registerValidationSchema = require("../../schemas/userSchemaValidation");

const registerValidation = (req, res, next) => {
  const payload = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = registerValidationSchema.validate(payload);

  if (error) {
    error.statusCode = 409;
    error.customMessage = `Error in User data: ${error.message}`;
    next(error);
  }
  next();
};

module.exports = registerValidation;
