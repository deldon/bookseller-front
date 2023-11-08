import { instance } from "../axios";

const request = {
  //Client
  isClient: (email) => {
    return instance.post("/client/isclient", email);
  },
  login: (newTodo) => {
    return instance.post("/client/login/", newTodo);
  },
  addClient: (data) => {
    return instance.post("/client/add", data);
  },

  //Order
  addOrder: (data) => {
    return instance.post("/order/add", data);
  },

};

export default request;