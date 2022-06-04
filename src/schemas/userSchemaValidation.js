const { Joi } = require("express-validation");

const registerValidationSchema = {
  body: Joi.object({
    username: Joi.string().required().alphanum(),
    password: Joi.string().required().alphanum().min(8).max(30),
    name: Joi.string().required().alphanum(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
};

const loginValidationSchema = {
  body: Joi.object({
    username: Joi.string().required().alphanum(),
    password: Joi.string().required().alphanum().min(8).max(30),
  }),
};

module.exports = { registerValidationSchema, loginValidationSchema };
