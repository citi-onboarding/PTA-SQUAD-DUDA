import axios from "axios";

const api = axios.create({
  //baseURL: "https://localhost:3001", quando criar uma branch
  baseURL: "https://pta-squad-duda.onrender.com/",
});

export default api;