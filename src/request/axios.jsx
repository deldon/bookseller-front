import axios from "axios";

const instance = axios.create({
  baseURL: "http://86.237.8.108:5000",
});

const setToken = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export { instance, setToken };