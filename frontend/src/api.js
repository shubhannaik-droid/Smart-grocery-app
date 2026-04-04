// src/api.js
// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-grocery-app-slen.onrender.com/api",
});

export default API;


