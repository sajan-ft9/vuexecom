import axios from "axios";
import store from "./store";
import router from "./router";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = store.state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (token && error.response.status === 401) {
      store.dispatch("logout");
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

export default apiClient;