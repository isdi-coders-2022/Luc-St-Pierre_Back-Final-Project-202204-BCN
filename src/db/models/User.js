const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
    places: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Place",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema, "users");

module.exports = User;
