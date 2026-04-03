const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

// 🔹 GET profile
router.get("/", async (req, res) => {
  try {
    const profile = await UserProfile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 POST or UPDATE profile (handles empty fields too)
router.post("/", async (req, res) => {
  try {
    let profile = await UserProfile.findOne();

    if (profile) {
      // 🔸 Replace every field with what user sent — even empty string
      profile.height = req.body.height || "";
      profile.weight = req.body.weight || "";
      profile.age = req.body.age || "";
      profile.goal = req.body.goal || "";
      profile.dietMode = req.body.dietMode || "";
      profile.updatedAt = new Date();
      await profile.save();
    } else {
      // 🔸 Create new document
      profile = await UserProfile.create({
        height: req.body.height || "",
        weight: req.body.weight || "",
        age: req.body.age || "",
        goal: req.body.goal || "",
        dietMode: req.body.dietMode || "",
      });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;




