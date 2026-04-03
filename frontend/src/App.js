import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";
import "./App.css";
import groceryBg from "./assets/grocery-bg.png";
import mainBg from "./assets/main-bg.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("grocery");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    category: "",
    expiryDate: "",
  });
  const [gymForm, setGymForm] = useState({
    height: "",
    weight: "",
    age: "",
    activity: "",
  });
  const [dietPlan, setDietPlan] = useState([]);
  const [gymPlan, setGymPlan] = useState([]);
  const [expenseForm, setExpenseForm] = useState({ title: "", amount: "" });
  const [expenses, setExpenses] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // ✅ Fetch groceries
  useEffect(() => {
    axios
      .get("/api/grocery")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // ✅ Fetch gym profile
  useEffect(() => {
    if (mode === "gym") {
      axios
        .get("/api/user-profile")
        .then((res) => {
          if (res.data) setGymForm(res.data);
        })
        .catch((err) => console.error("Error loading gym profile:", err));
    }
  }, [mode]);

  // ✅ Fetch expenses
  useEffect(() => {
    if (mode === "expense") {
      axios
        .get("/api/expenses")
        .then((res) => setExpenses(res.data))
        .catch((err) => console.error("Error loading expenses:", err));
    }
  }, [mode]);

  // Grocery handlers
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.category || !form.expiryDate)
      return;
    try {
      const res = await axios.post("/api/grocery", form);
      setItems([...items, res.data]);
      setForm({ name: "", quantity: "", category: "", expiryDate: "" });
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/grocery/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Gym handlers
  const handleGymChange = (e) =>
    setGymForm({ ...gymForm, [e.target.name]: e.target.value });

  const getWorkoutRecommendation = (activity) => {
    if (activity === "beginner")
      return ["🚶 Light cardio - 20 mins", "🤸 Basic stretches", "💪 Bodyweight exercises"];
    else if (activity === "intermediate")
      return ["🏃 Moderate cardio - 30 mins", "🏋️ Strength training", "🧘 Core exercises"];
    else if (activity === "advanced")
      return ["⚡ HIIT", "🏋️ Heavy lifting", "🤸 Advanced calisthenics"];
    else return ["⚠️ Select activity level"];
  };

  const getDietRecommendation = (age, weight, height) => {
    age = Number(age);
    weight = Number(weight);
    height = Number(height);
    if (age < 10 && weight < 30) {
      return ["🥛 Milk + cereal", "🍌 Banana slices", "🥪 Cheese sandwich", "🍲 Lentil soup"];
    } else if (age >= 10 && age < 15 && weight < 40) {
      return ["🍗 Chicken wrap", "🍚 Rice + dal", "🍎 Apple + peanut butter", "🥣 Oats"];
    } else if (age >= 15 && age < 20 && weight >= 50 && weight < 65) {
      return ["🐟 Fish curry + rice", "🥗 Boiled egg salad", "🥤 Protein smoothie", "🍲 Veg stew"];
    } else if (age >= 20 && age < 25 && weight < 60) {
      return ["🥣 High-protein oats", "🍗 Chicken sandwich", "🍉 Watermelon", "🥗 Leafy greens"];
    } else if (age >= 20 && age < 25 && weight >= 60) {
      return ["🍳 Omelette + toast", "🍲 Paneer curry", "🍌 Banana shake", "🥦 Steamed veggies"];
    } else if (age >= 25 && age < 30 && weight < 65) {
      return ["🥗 Quinoa salad", "🍗 Grilled chicken", "🍇 Mixed fruits", "🥛 Milk/soy milk"];
    } else if (age >= 25 && age < 30 && weight >= 65) {
      return ["🍛 Brown rice + dal", "🥒 Cucumber salad", "🥩 Lean beef/chicken", "🍵 Green tea"];
    } else if (age >= 30 && age < 40 && weight >= 70) {
      return ["🍗 Grilled chicken", "🥣 Oats with berries", "🥦 Steamed broccoli", "🍲 Dal with brown rice"];
    } else if (age >= 30 && age < 40 && weight < 70) {
      return ["🥗 Chickpea salad", "🍛 Rice + sambar", "🥚 Egg curry", "🍊 Citrus fruit"];
    } else if (age >= 40 && age < 50 && weight < 70) {
      return ["🥣 Vegetable upma", "🥗 Sprouts salad", "🐟 Baked fish", "🍵 Herbal tea"];
    } else if (age >= 40 && weight >= 70 && age < 50) {
      return ["🍲 Multigrain khichdi", "🥬 Spinach curry", "🍗 Roast chicken", "🍏 Apple slices"];
    } else if (age >= 50 && age < 60 && weight < 70) {
      return ["🥦 Steamed veggies", "🍲 Moong dal khichdi", "🍇 Seasonal fruits", "🥛 Buttermilk"];
    } else if (age >= 50 && weight >= 70 && age < 60) {
      return ["🍚 Steamed rice", "🍲 Khichdi", "🍏 Apple slices", "🥗 Sprouts salad"];
    } else if (age >= 60 && weight < 65) {
      return ["🥣 Porridge", "🥦 Boiled vegetables", "🍲 Clear soup", "🍎 Seasonal fruit"];
    } else if (age >= 60 && weight >= 65) {
      return ["🍲 Soft dal rice", "🥗 Cucumber + carrot salad", "🍞 Whole wheat roti", "🥛 Warm milk"];
    } else {
      return ["🍎 Balanced diet", "🥗 Mixed vegetables", "🍗 Protein (egg/chicken/lentils)", "🥛 Milk or plant-based options"];
    }
  };

  const handleGymSubmit = async (e) => {
    e.preventDefault();
    const { age, weight, height, activity } = gymForm;
    try {
      await axios.post("/api/user-profile", gymForm);
    } catch (err) {
      console.error("Error saving gym profile:", err);
    }
    setDietPlan(getDietRecommendation(age, weight, height));
    setGymPlan(getWorkoutRecommendation(activity));
  };

  // Expense handlers
  const handleExpenseChange = (e) =>
    setExpenseForm({ ...expenseForm, [e.target.name]: e.target.value });

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.amount) return;
    try {
      const res = await axios.post("/api/expenses", expenseForm);
      setExpenses([res.data, ...expenses]);
      setExpenseForm({ title: "", amount: "" });
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleExpenseDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  // Login / Signup
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleAuth = async (e) => {
    e.preventDefault();
    const { username, password } = loginForm;
    if (!username || !password) {
      setMessage("⚠️ Please enter username and password.");
      return;
    }
    try {
      if (isSignup) {
        await axios.post("/api/auth/signup", loginForm);
        setMessage("✅ Signup successful! You can now log in.");
        setIsSignup(false);
      } else {
        const res = await axios.post("/api/auth/login", loginForm);
        if (res.data.message === "Login successful") {
          setIsLoggedIn(true);
          setMessage("");
        } else setMessage("❌ Invalid username or password.");
      }
    } catch (err) {
      setMessage(
        "❌ " + (err.response?.data?.message || "Something went wrong")
      );
    }
  };

  // --- LOGIN / SIGNUP PAGE ---
  if (!isLoggedIn)
    return (
      <div
        className="login-page"
        style={{
          backgroundImage: `url(${groceryBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            textAlign: "center",
            width: "350px",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "22px", fontWeight: "600" }}>
            {isSignup ? "Signup" : "Login"}
          </h2>
          <form onSubmit={handleAuth}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginForm.username}
              onChange={handleLoginChange}
              style={{
                padding: "12px",
                width: "100%",
                margin: "10px 0",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              style={{
                padding: "12px",
                width: "100%",
                margin: "10px 0",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#000",
                color: "#fff",
                padding: "12px",
                width: "100%",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {isSignup ? "Signup" : "Login"}
            </button>
          </form>
          {message && (
            <p style={{ color: "#d00", marginTop: "10px", fontSize: "14px" }}>
              {message}
            </p>
          )}
          <p style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}>
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              style={{ color: "#000", fontWeight: "600", cursor: "pointer" }}
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
              }}
            >
              {isSignup ? "Login" : "Signup"}
            </span>
          </p>
        </div>
      </div>
    );

  // --- MAIN APP PAGE ---
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        color: "#333",
      }}
    >
      <div className="header" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081854.png"
          alt="logo"
          style={{ width: "50px", height: "50px" }}
        />
        <h1>Smart Grocery Planner</h1>
      </div>

      <div className="mode-buttons" style={{ margin: "20px 0" }}>
        <button className="btn" onClick={() => setMode("grocery")}> ⏳ Expiry Tracker </button>
        <button className="btn" onClick={() => setMode("gym")}>🏋️ Gym & Diet Mode</button>
        <button className="btn" onClick={() => setMode("expense")}>💰 Expense Tracker</button>
      </div>

      {/* Expiry Mode */}
      {mode === "grocery" && (
        <>
          <div className="form-container">
            <form className="grocery-form" onSubmit={handleAdd}>
              <input
                type="text"
                name="name"
                placeholder="Item name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
              />
              <button className="btn" type="submit">Add Item</button>
            </form>
          </div>

          <div className="list-container">
            <h2>🛒 Grocery List</h2>
            {items.length > 0 ? (
              items.map((item) => {
                const expiryDate = new Date(item.expiryDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const diffDays = Math.ceil(
                  (expiryDate - today) / (1000 * 60 * 60 * 24)
                );
                let expiryMessage = "";
                let alertClass = "";
                if (diffDays < 0) {
                  expiryMessage = "⚠️ Already expired:";
                  alertClass = "expired";
                } else if (diffDays <= 5) {
                  expiryMessage = "⚠️ Expiring soon:";
                  alertClass = "near-expiry";
                }
                return (
                  <div key={item._id} className={`list-item ${alertClass}`}>
                    <span>
                      <strong>{item.name}</strong> - {item.quantity} ({item.category})
                      <br />
                      {expiryMessage && (
                        <span className="expiry-alert">{expiryMessage}</span>
                      )}
                      <small>Expiry: {expiryDate.toLocaleDateString()}</small>
                    </span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="delete-btn"
                    >
                      ❌
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="empty">No items added yet</p>
            )}
          </div>
        </>
      )}

      {/* Gym Mode */}
      {mode === "gym" && (
        <div className="list-container">
          <h2>🏋️ Personalized Gym & Diet Plan</h2>
          <form className="grocery-form" onSubmit={handleGymSubmit}>
            <input
              type="number"
              name="height"
              placeholder="Height (ft)"
              value={gymForm.height}
              onChange={handleGymChange}
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={gymForm.weight}
              onChange={handleGymChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={gymForm.age}
              onChange={handleGymChange}
            />
            <select
              name="activity"
              value={gymForm.activity}
              onChange={handleGymChange}
            >
              <option value="">Select activity level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button className="btn" type="submit">Get Plan</button>
          </form>

          {dietPlan.length > 0 && (
            <>
              <h3>🍽️ Diet Recommendation</h3>
              <ul>{dietPlan.map((meal, idx) => <li key={idx}>{meal}</li>)}</ul>
            </>
          )}

          {gymPlan.length > 0 && (
            <>
              <h3>💪 Workout Plan</h3>
              <ul>{gymPlan.map((w, idx) => <li key={idx}>{w}</li>)}</ul>
            </>
          )}
        </div>
      )}

      {/* Expense Mode */}
      {mode === "expense" && (
        <div className="list-container">
          <h2>💰 Expense Tracker</h2>
          <form className="grocery-form" onSubmit={handleExpenseSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Expense title"
              value={expenseForm.title}
              onChange={handleExpenseChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expenseForm.amount}
              onChange={handleExpenseChange}
            />
            <button className="btn" type="submit">Add</button>
          </form>
          <h3>Total: ₹{totalExpenses}</h3>
          {expenses.length > 0 ? (
            expenses.map((exp) => (
              <div key={exp._id} className="list-item">
                <span>
                  <strong>{exp.title}</strong> - ₹{exp.amount}
                </span>
                <button
                  onClick={() => handleExpenseDelete(exp._id)}
                  className="delete-btn"
                >
                  ❌
                </button>
              </div>
            ))
          ) : (
            <p className="empty">No expenses yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;








