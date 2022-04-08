import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "http://localhost:9002/app";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;
axiosApi.defaults.headers.common["token"] = localStorage.getItem('authUser').replace(/^"(.*)"$/, '$1');

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, data, config ={}) {
  return await axiosApi.get(url, data, { ...config }).then(response => response.data);
}

export async function getWithParam(url, data, config ={responseType: 'blob'}) {
  return await axiosApi.get(url+"?"+$.param(data), { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
