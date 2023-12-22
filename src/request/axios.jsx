import axios from "axios";

const instance = axios.create({
  baseURL: "https://lireencore.fr/api",
 // baseURL: "http://localhost:5001",
});

const setToken = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export { instance, setToken };