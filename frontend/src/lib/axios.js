import axios from "axios";

// Dynamic base URL - same pattern as Thinkboard
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:10000/api"
    : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
