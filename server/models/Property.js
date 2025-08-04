const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  address: String,
  rent: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Create 2dsphere index for GeoSearch
propertySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);
