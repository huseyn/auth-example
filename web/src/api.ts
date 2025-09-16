import axios, { type AxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken } from "./tokenStore";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function processQueue(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

// cookie-dən CSRF token oxumaq
function readCookie(name: string) {
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers?.set?.("Authorization", `Bearer ${token}`);
  }

  const xsrf = readCookie("XSRF-TOKEN");
  if (xsrf) {
    config.headers?.set?.("X-XSRF-TOKEN", xsrf);
  }

  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original: AxiosRequestConfig & { _retry?: boolean } = error.config || {};

    if (error?.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (!token) return reject(error);

          original.headers = {
            ...(original.headers || {}),
            Authorization: `Bearer ${token}`,
          };

          resolve(api(original));
        });
      });
    }

    try {
      isRefreshing = true;

      const { data } = await api.post("/auth/refresh");
      setAccessToken(data.accessToken);
      processQueue(data.accessToken);

      original.headers = {
        ...(original.headers || {}),
        Authorization: `Bearer ${data.accessToken}`,
      };

      return api(original);
    } catch (e) {
      setAccessToken(null);
      processQueue(null);
      window.location.href = "/login";
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
