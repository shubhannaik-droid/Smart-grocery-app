import React, { useState, useEffect } from "react";
import API from "../api";

function GroceryList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    category: "",
    expiryDate: "",
  });

  // fetch grocery items
  useEffect(() => {
    API.get("/grocery").then((res) => setItems(res.data));
  }, []);

  // handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add grocery item
  const addItem = async (e) => {
    e.preventDefault();
    const res = await API.post("/grocery", form);
    setItems([...items, res.data]);
    setForm({ name: "", quantity: "", category: "", expiryDate: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Smart Grocery Planner</h1>

      {/* Form to Add Items */}
      <form onSubmit={addItem} style={{ marginBottom: "20px" }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Item name" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} required />
        <button type="submit">Add Item</button>
      </form>

      {/* Display Items */}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} ({item.quantity}) - {item.category} - Exp:{" "}
            {new Date(item.expiryDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
