// backend/routes/groceryRoutes.js
const express = require("express");
const router = express.Router();
const GroceryItem = require("../models/GroceryItem");

// Add Grocery Item
router.post("/", async (req, res) => {
  try {
    const item = new GroceryItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Pantry Dashboard — list items with daysLeft
router.get("/", async (req, res) => {
  try {
    const items = await GroceryItem.find().sort({ expiryDate: 1 });
    const now = new Date();
    const updated = items.map(item => {
      const daysLeft = Math.ceil((item.expiryDate - now) / (1000 * 60 * 60 * 24));
      return { ...item.toObject(), daysLeft };
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Grocery Item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await GroceryItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

