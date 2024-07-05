import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/users/mauriciocr22",
});

export default api;
