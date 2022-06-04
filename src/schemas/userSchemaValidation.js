const { Joi } = require("express-validation");

const registerValidationSchema = {
  body: Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(15)
      .messages({ message: "name is required" })
      .trim(true)
      .required(),
    userName: Joi.string()
      .alphanum()
      .min(3)
      .max(15)
      .messages({ message: "username is required" })
      .trim(true)
      .required(),
    email: Joi.string()
      .email()
      .messages({ message: "email is required" })
      .trim(true)
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .messages({ message: "password is required" })
      .min(8)
      .trim(true)
      .required(),
  }),
};

const loginValidationSchema = {
  body: Joi.object({
    userName: Joi.string()
      .alphanum()
      .min(3)
      .max(15)
      .messages({ message: "username is required" })
      .trim(true)
      .required(),
    pasword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .messages({ message: "password is required" })
      .min(8)
      .trim(true)
      .required(),
  }),
};

module.exports = { registerValidationSchema, loginValidationSchema };
