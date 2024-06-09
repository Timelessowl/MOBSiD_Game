import axios, { AxiosInstance, AxiosRequestConfig, AxiosProxyConfig } from "axios";


const proxy : AxiosProxyConfig = {
  protocol: 'http',
  host: '127.0.0.1',
  port: 8000

};

axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfCookieName = "X-CSRFToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const BACKEND_URL = "http://192.168.1.51:8000/api";
// const BACKEND_URL = "http://127.0.0.1:8000/api";
// const BACKEND_URL = "/api";
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    proxy: proxy,
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers["X-CSRFToken"] = "*";
    }

    return config;
  });

  return api;
};
