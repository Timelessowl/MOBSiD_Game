import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfCookieName = "X-CSRFToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const BACKEND_URL = "http://127.0.0.1:8000";
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers["X-CSRFToken"] = "hui";
    }

    return config;
  });

  return api;
};
