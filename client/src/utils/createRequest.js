import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://skillbazaar-production.up.railway.app/api/",
  withCredentials: true
})

export default newRequest