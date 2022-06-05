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
      type: Number,
    },
    isListed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
    },
    kilometers: {
      type: Number,
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
