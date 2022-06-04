const { Joi } = require("express-validation");

const registerValidation = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(15).trim(true).required(),
    userName: Joi.string().alphanum().min(3).max(15).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
  }),
};

module.exports = registerValidation;
