const { Schema, model, SchemaTypes } = require("mongoose");

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
        type: SchemaTypes.ObjectId,
        ref: "Place",
      },
    ],
    wishlists: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Place",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema, "users");

module.exports = User;
