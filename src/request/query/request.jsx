import { instance } from "../axios";

const request = {
  sherch: (search) => {
    return instance
      .get("/title?search="+search)
      .then((res) => res.data);
  },
  bookById: (id) => {
    return instance
      .get("/book/"+id)
      .then((res) => res.data);
  },
  topAuthors: () => {
    return instance
      .get("/author/top")
      .then((res) => res.data);
  },
  LatestArrival: () => {
    return instance
      .get("/home/latestarrival")
      .then((res) => res.data);
  },
  LastPublication: () => {
    return instance
      .get("/home/lastpublication")
      .then((res) => res.data);
  },
  myorder: () => {
    return instance
      .get("/order/myorder")
      .then((res) => res.data);
  }
};

export default request;