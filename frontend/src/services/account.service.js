import apiClient from "@/lib/axios";

export async function getAccount() {
  return apiClient.get("/account");
}

export async function updateAccount(data) {
  return apiClient.patch("/account", data);
}

export async function getAccountBookings() {
  return apiClient.get("/account/bookings");
}

export async function getAccountPayments() {
  return apiClient.get("/account/payments");
}

export async function getAccountNotifications() {
  return apiClient.get("/account/notifications");
}

export async function markNotificationRead(id) {
  return apiClient.patch(`/account/notifications/${id}/read`);
}
