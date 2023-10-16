import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8090/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user");
    const jwtToken = JSON.parse(token);
    if (token) {
      config.headers.Authorization = `Bearer ${jwtToken.originalToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
