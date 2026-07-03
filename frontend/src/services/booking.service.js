import apiClient from "@/lib/axios";

export async function checkAvailability(data) {
  return apiClient.post("/bookings/check-availability", data, { optionalAuth: true });
}

export async function createBooking(data) {
  return apiClient.post("/bookings", data, { optionalAuth: true });
}
