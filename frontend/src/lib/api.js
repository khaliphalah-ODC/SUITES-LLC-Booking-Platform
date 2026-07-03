import apiClient, { clearStoredAuth, storeAuthSession } from "@/lib/axios";
import { getCurrentUser, logout } from "@/services/auth.service";
import {
  getAmenities as getAmenitiesFromApi,
  getExperiences as getExperiencesFromApi,
  getGallery as getGalleryFromApi,
  getSuiteBySlug,
  getSuites as getSuitesFromApi,
} from "@/services/suites.service";
import { uploadImage } from "@/services/dashboard.service";

const fallbackSuites = [
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    slug: "presidential-suite",
    short_description: "The signature residence with expansive living space and personalized service.",
    price_per_night: 520,
    max_guests: 4,
    bed_type: "King",
    size: "120 sqm",
    featured: true,
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
        alt_text: "Luxury presidential suite interior",
      },
    ],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    slug: "executive-suite",
    short_description: "A polished suite for business travelers and longer luxury stays.",
    price_per_night: 275,
    max_guests: 3,
    bed_type: "King + Sofa Bed",
    size: "68 sqm",
    featured: true,
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
        alt_text: "Executive hotel suite with warm light",
      },
    ],
  },
  {
    id: "deluxe-garden-suite",
    name: "Deluxe Garden Suite",
    slug: "deluxe-garden-suite",
    short_description: "A calm garden-facing suite with warm finishes and natural light.",
    price_per_night: 185,
    max_guests: 2,
    bed_type: "King",
    size: "48 sqm",
    featured: true,
    images: [
      {
        image_url:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
        alt_text: "Garden suite bedroom",
      },
    ],
  },
];

function normalizePath(path) {
  return path.replace(/^\/api/, "") || "/";
}

function normalizeAxiosOptions(options = {}) {
  const config = { ...options };

  if (config.body !== undefined) {
    config.data = typeof config.body === "string" ? JSON.parse(config.body) : config.body;
    delete config.body;
  }

  return config;
}

export async function apiFetch(path, options = {}) {
  return apiClient.request({
    url: normalizePath(path),
    method: options.method || "GET",
    ...normalizeAxiosOptions(options),
    skipAuth: true,
    skipAuthRefresh: true,
  });
}

export async function clientFetch(path, options = {}) {
  return apiClient.request({
    url: normalizePath(path),
    method: options.method || "GET",
    ...normalizeAxiosOptions(options),
  });
}

export async function getSuites(params = {}) {
  try {
    return await getSuitesFromApi(params);
  } catch {
    return {
      suites: fallbackSuites,
      meta: {
        page: 1,
        limit: fallbackSuites.length,
        total: fallbackSuites.length,
        totalPages: 1,
      },
    };
  }
}

export async function getSuite(slug) {
  try {
    return await getSuiteBySlug(slug);
  } catch {
    const suite = fallbackSuites.find((item) => item.slug === slug) || fallbackSuites[0];
    return { suite };
  }
}

export async function getAmenities(params = {}) {
  try {
    return await getAmenitiesFromApi(params);
  } catch {
    return {
      amenities: [
        { id: "wifi", name: "High-Speed Wi-Fi", category: "Comfort", description: "Reliable connectivity throughout the property." },
        { id: "lounge", name: "Private Lounge", category: "Suite", description: "Refined space for quiet rest or hosting." },
        { id: "concierge", name: "Concierge Support", category: "Service", description: "Personal support for dining, transport, and local requests." },
      ],
      meta: { page: 1, limit: 3, total: 3, totalPages: 1 },
    };
  }
}

export async function getExperiences(params = {}) {
  try {
    return await getExperiencesFromApi(params);
  } catch {
    return {
      experiences: [
        { id: "dining", title: "Private Rooftop Dining", category: "Dining", description: "An intimate evening arranged above the city.", price: 150, image_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80" },
        { id: "culture", title: "Liberian Cultural Tour", category: "Culture", description: "A guided local experience shaped around heritage and markets.", price: 95, image_url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80" },
      ],
      meta: { page: 1, limit: 2, total: 2, totalPages: 1 },
    };
  }
}

export async function getGallery(params = {}) {
  try {
    return await getGalleryFromApi(params);
  } catch {
    return {
      images: [
        { id: "suite", title: "Emerald Suite Interior", category: "Suites", image_url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", alt_text: "Luxury suite interior" },
        { id: "lounge", title: "Gold Lounge Detail", category: "Interiors", image_url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80", alt_text: "Warm lounge interior" },
        { id: "arrival", title: "Garden Arrival", category: "Property", image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80", alt_text: "Property garden arrival" },
      ],
      meta: { page: 1, limit: 3, total: 3, totalPages: 1 },
    };
  }
}

export function getSuiteImage(suite) {
  return (
    suite?.images?.find((image) => image.is_primary)?.image_url ||
    suite?.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
  );
}

export {
  clearStoredAuth,
  getCurrentUser,
  logout,
  storeAuthSession,
  uploadImage,
};
