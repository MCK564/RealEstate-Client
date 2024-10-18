import axios from "axios";

const axiosInstance  = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 15000,
  headers: {'X-Custom-Header': 'foobar'}
});



const setAuthToken = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



export { axiosInstance, setAuthToken };