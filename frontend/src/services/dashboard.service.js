import apiClient from "@/lib/axios";

export async function getDashboard() {
  return apiClient.get("/dashboard");
}

export async function getBookings(params = {}) {
  return apiClient.get("/dashboard/bookings", { params });
}

export async function updateBookingStatus(id, status) {
  return apiClient.patch(`/dashboard/bookings/${id}/status`, { status });
}

export async function getMessages(params = {}) {
  return apiClient.get("/dashboard/messages", { params });
}

export async function updateMessageStatus(id, status) {
  return apiClient.patch(`/dashboard/messages/${id}/status`, { status });
}

export async function getBespokeRequests(params = {}) {
  return apiClient.get("/dashboard/bespoke-requests", { params });
}

export async function updateBespokeRequestStatus(id, status) {
  return apiClient.patch(`/dashboard/bespoke-requests/${id}/status`, { status });
}

export async function getUsers(params = {}) {
  return apiClient.get("/dashboard/users", { params });
}

export async function createUser(data) {
  return apiClient.post("/dashboard/users", data);
}

export async function updateUser(id, data) {
  return apiClient.patch(`/dashboard/users/${id}`, data);
}

export async function getSettings() {
  return apiClient.get("/dashboard/settings");
}

export async function updateSettings(data) {
  return apiClient.patch("/dashboard/settings", data);
}

export async function createSuite(data) {
  return apiClient.post("/dashboard/suites", data);
}

export async function updateSuite(id, data) {
  return apiClient.patch(`/dashboard/suites/${id}`, data);
}

export async function deleteSuite(id) {
  return apiClient.delete(`/dashboard/suites/${id}`);
}

export async function createDashboardResource(path, data) {
  return apiClient.post(path, data);
}

export async function updateDashboardResource(path, id, data) {
  return apiClient.patch(`${path}/${id}`, data);
}

export async function deleteDashboardResource(path, id) {
  return apiClient.delete(`${path}/${id}`);
}

export async function listDashboardResource(path) {
  return apiClient.get(path);
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const data = await apiClient.post("/dashboard/uploads/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.image;
}
