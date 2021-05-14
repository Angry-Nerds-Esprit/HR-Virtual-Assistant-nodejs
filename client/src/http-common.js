import axios from "axios";
import { authHeader } from "_helpers";

export default axios.create({
  baseURL: "http://localhost:4000/",
  headers:  authHeader()
});
