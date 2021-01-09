import axios from "axios";

export default axios.create({
  baseURL: "https://todo-json-server.herokuapp.com",
});
