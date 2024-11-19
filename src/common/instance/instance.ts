import axios from "axios";

export const baseURL = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
});
baseURL.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('sn-token')}`

  return config
})