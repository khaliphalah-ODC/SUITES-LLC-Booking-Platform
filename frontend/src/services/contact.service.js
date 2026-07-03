import apiClient from "@/lib/axios";

export async function submitContactMessage(data) {
  return apiClient.post("/contact", data, { skipAuth: true, skipAuthRefresh: true });
}
