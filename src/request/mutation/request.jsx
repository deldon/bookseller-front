import { instance } from "../axios";

const request = {
  //Client
  isClient: (email) => {
    return instance.post("/client/isclient", email);
  },
  login: (data) => {
    return instance.post("/client/login/", data);
  },
  addClient: (data) => {
    return instance.post("/client/add", data);
  },
  ValidMail: (data) => {
    return instance.post("/client/validemail/", data);
  },

  //Order
  addOrder: (data) => {
    return instance.post("/order/add", data);
  },


};

export default request;