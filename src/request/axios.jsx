import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.100:5000",
});

const setToken = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export { instance, setToken };