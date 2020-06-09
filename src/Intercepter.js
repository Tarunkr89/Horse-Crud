import axios from "axios";

axios.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem("token"));
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  return config;
});
