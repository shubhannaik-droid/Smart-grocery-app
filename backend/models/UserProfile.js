const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  height: Number,
  weight: Number,
  age: Number,
  goal: String,
  dietMode: String,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
