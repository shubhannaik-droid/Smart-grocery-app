// ✅ Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/grocery", require("./routes/groceryRoutes"));
app.use("/api/user-profile", require("./routes/userProfileRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes")); // add this if you have Expense routes

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start server
app.listen(5000, "0.0.0.0", () => console.log("Server running on port 5000"));


