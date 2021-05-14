import axios from "axios";
import { authHeader } from "_helpers";

export default axios.create({
  baseURL: process.env.baseURL ,
  headers:  authHeader()
});
