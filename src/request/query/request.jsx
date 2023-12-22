import { instance } from "../axios";

const request = {
  //books

  AllBooks: (page) => {
    return instance.get("/books/all?pages=" + page).then((res) => res.data);
  },

  sherch: (search) => {
    return instance
      .get("/books/search?q=" + search)
      .then((res) => res.data);
  },
  bookById: (id) => {
    return instance.get("/books/id/" + id).then((res) => res.data);
  },

  LatestArrival: () => {
    return instance.get("/books/latestarrival").then((res) => res.data);
  },
  LastPublication: () => {
    return instance.get("/books/lastpublication").then((res) => res.data);
  },


  //order

  myorder: () => {
    return instance.get("/order/myorder").then((res) => res.data);
  },

  //authors
  topAuthors: () => {
    return instance.get("/author/top").then((res) => res.data);
  },
};

export default request;
