const { SchemaTypes } = require("mongoose");
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
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
    placeType: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    numberOfRooms: {
      type: String,
      required: true,
    },
    numberOfBeds: {
      type: String,
    },
    numberOfGuests: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "Spain",
    },
    creator: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    reservedBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    rating: {
      type: String,
    },
    isListed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
    },
    kilometers: {
      type: String,
    },
    category: {
      type: String,
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

const Place = model("Place", PlaceSchema, "places");

module.exports = Place;
