import axios from "axios";

var apiInstace = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default apiInstace;
