import axios from "axios";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_UR ||
  "http://localhost:5000/api";

export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

function canUseStorage() {
  return typeof window !== "undefined";
}

export function storeAuthSession(data = {}) {
  if (!canUseStorage()) return;
  if (data.user) {
    window.localStorage.setItem("suites_user", JSON.stringify(data.user));
  }
  if (data.accessToken || data.token) {
    window.localStorage.setItem("suites_access_token", data.accessToken || data.token);
  }
  if (data.refreshToken) {
    window.localStorage.setItem("suites_refresh_token", data.refreshToken);
  }
}

export function clearStoredAuth() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem("suites_access_token");
  window.localStorage.removeItem("suites_refresh_token");
  window.localStorage.removeItem("suites_user");
}

function getStoredAccessToken() {
  if (!canUseStorage()) return "";
  return window.localStorage.getItem("suites_access_token") || "";
}

function getStoredRefreshToken() {
  if (!canUseStorage()) return "";
  return window.localStorage.getItem("suites_refresh_token") || "";
}

function toAppError(error) {
  const data = error.response?.data;
  const fieldMessages = data?.details?.fields
    ?.map((field) => `${field.field}: ${field.message}`)
    .join(", ");
  const message =
    fieldMessages ||
    data?.message ||
    (typeof data === "string" ? data : "") ||
    error.message ||
    "Request failed.";
  const appError = new Error(message);
  appError.status = error.response?.status;
  appError.details = data?.details;
  return appError;
}

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token && !config.skipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config || {};
    const canRefresh =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh &&
      (originalRequest.url !== "/auth/me" || window.localStorage.getItem("suites_user"));

    if (canRefresh) {
      originalRequest._retry = true;

      try {
        const response = await refreshClient.post("/auth/refresh", {
          refreshToken: getStoredRefreshToken(),
        });
        storeAuthSession(response.data);
        const nextToken = response.data?.accessToken || response.data?.token;
        if (nextToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${nextToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearStoredAuth();

        if (originalRequest.optionalAuth) {
          originalRequest.skipAuth = true;
          originalRequest.skipAuthRefresh = true;
          delete originalRequest.headers?.Authorization;
          return apiClient(originalRequest);
        }
      }
    }

    throw toAppError(error);
  }
);

export default apiClient;
