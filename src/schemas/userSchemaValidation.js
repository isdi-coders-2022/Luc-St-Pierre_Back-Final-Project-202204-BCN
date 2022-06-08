const { Joi } = require("express-validation");

const registerValidationSchema = {
  body: Joi.object({
    username: Joi.string().required().alphanum(),
    password: Joi.string().required().alphanum().min(8).max(30),
    name: Joi.string().required().alphanum(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    location: Joi.string(),
    image: Joi.string().allow(null, ""),
  }),
};

const loginValidationSchema = {
  body: Joi.object({
    username: Joi.string()
      .required()
      .max(20)
      .alphanum()
      .message({ message: "Username is required" }),
    password: Joi.string()
      .required()
      .alphanum()
      .min(8)
      .max(20)
      .message({ message: "Password is required" }),
  }),
};

module.exports = { registerValidationSchema, loginValidationSchema };
