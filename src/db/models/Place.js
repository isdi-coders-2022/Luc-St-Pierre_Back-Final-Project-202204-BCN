const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const PlaceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    placeType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
    },
    numberOfBeds: {
      type: Number,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      default: "Spain",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    reservedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("Place", PlaceSchema, "places");

module.exports = User;
