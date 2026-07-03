import apiClient from "@/lib/axios";

export async function getSuites(params = {}) {
  return apiClient.get("/suites", { params, skipAuth: true, skipAuthRefresh: true });
}

export async function getSuiteBySlug(slug) {
  return apiClient.get(`/suites/${slug}`, { skipAuth: true, skipAuthRefresh: true });
}

export async function getAmenities(params = {}) {
  return apiClient.get("/amenities", { params, skipAuth: true, skipAuthRefresh: true });
}

export async function getExperiences(params = {}) {
  return apiClient.get("/experiences", { params, skipAuth: true, skipAuthRefresh: true });
}

export async function getGallery(params = {}) {
  return apiClient.get("/gallery", { params, skipAuth: true, skipAuthRefresh: true });
}

export function getSuiteImage(suite) {
  return (
    suite?.images?.find((image) => image.is_primary)?.image_url ||
    suite?.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
  );
}
