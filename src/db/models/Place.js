const { SchemaTypes } = require("mongoose");
const { Schema, model } = require("mongoose");

const PlaceSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageBackup: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    placeType: {
      type: String,
    },
    placeDescription: {
      type: String,
    },
    price: {
      type: String,
    },
    numberOfRooms: {
      type: String,
    },
    numberOfBeds: {
      type: String,
    },
    numberOfGuests: {
      type: String,
    },
    country: {
      type: String,
      default: "Spain",
    },
    creator: {
      type: SchemaTypes.ObjectId,
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
      enum: {
        values: [
          "Islands",
          "Beach",
          "Amazing pools",
          "OMG!",
          "National parks",
          "Chalets",
          "Design",
          "Arctic",
          "Tiny homes",
          "Treehouses",
          "Surfing",
          "Amazing views",
          "Lakefront",
          "Camping",
          "Shared homes",
        ],
      },
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
