import axios from "axios";

let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");
const headers = {
  "Content-Type": "application/json",
  access: accessToken,
  refresh: refreshToken,
};

const apiService = axios.create({
    baseURL : 'https://flixxit-server-9v89.onrender.com',
    headers : headers
})


export default apiService;