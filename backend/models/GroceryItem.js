// backend/models/GroceryItem.js
const mongoose = require("mongoose");

const GroceryItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, default: 1 },
  category: { 
    type: String, 
    enum: ["vegetable", "fruit", "protein", "grain", "dairy", "other"], 
    default: "other" 
  },
  expiryDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("GroceryItem", GroceryItemSchema);

