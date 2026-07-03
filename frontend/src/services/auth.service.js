import apiClient, { clearStoredAuth, storeAuthSession } from "@/lib/axios";

export async function login(data) {
  clearStoredAuth();
  const result = await apiClient.post("/auth/login", data, { skipAuthRefresh: true });
  storeAuthSession(result);
  return result;
}

export async function register(data) {
  clearStoredAuth();
  const result = await apiClient.post("/auth/register", data, { skipAuthRefresh: true });
  storeAuthSession(result);
  return result;
}

export async function logout() {
  try {
    await apiClient.post("/auth/logout", {}, { skipAuthRefresh: true });
  } finally {
    clearStoredAuth();
  }
}

export async function getCurrentUser() {
  const data = await apiClient.get("/auth/me");
  storeAuthSession(data);
  return data.user;
}

export { clearStoredAuth, storeAuthSession };
