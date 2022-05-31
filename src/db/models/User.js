const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
