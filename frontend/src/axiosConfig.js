// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://smart-grocery-app-slen.onrender.com",
});

export default instance;
