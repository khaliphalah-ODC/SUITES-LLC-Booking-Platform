const Dashboard = require("../models/dashboard.model");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/password");
const { pickPublicUser } = require("../utils/queries");
const httpError = require("../utils/httpError");

const suiteFields = [
  "name",
  "slug",
  "short_description",
  "description",
  "price_per_night",
  "quantity",
  "max_guests",
  "bed_type",
  "size",
  "status",
  "featured",
];
const amenityFields = ["name", "slug", "description", "icon", "category"];
const experienceFields = ["title", "slug", "description", "category", "image_url", "price", "status"];
const galleryFields = ["title", "image_url", "alt_text", "category", "sort_order"];

const suites = createCrudHandlers(
  Dashboard.crud("suite_types", suiteFields, { hasUpdatedAt: true }),
  "suite"
);
const amenities = createCrudHandlers(Dashboard.crud("amenities", amenityFields), "amenity");
const experiences = createCrudHandlers(
  Dashboard.crud("experiences", experienceFields, { hasUpdatedAt: true }),
  "experience"
);
const gallery = createCrudHandlers(Dashboard.crud("gallery_images", galleryFields), "image");

async function overview(req, res) {
  res.status(200).json({ stats: await Dashboard.countOverview() });
}

async function listBookings(req, res) {
  const result = await Dashboard.listDashboardBookings(req.query);
  res.status(200).json({ bookings: result.data, meta: result.meta });
}

async function getBooking(req, res) {
  const booking = await Dashboard.getDashboardBooking(req.params.id);
  if (!booking) throw httpError(404, "Booking not found.");
  res.status(200).json({ booking });
}

async function updateBookingStatus(req, res) {
  const booking = await Dashboard.updateBookingStatus(req.params.id, req.body.status);
  if (!booking) throw httpError(404, "Booking not found.");
  res.status(200).json({ booking });
}

async function listMessages(req, res) {
  const result = await Dashboard.listMessages(req.query);
  res.status(200).json({ messages: result.data, meta: result.meta });
}

async function updateMessageStatus(req, res) {
  const message = await Dashboard.updateMessageStatus(req.params.id, req.body.status);
  if (!message) throw httpError(404, "Contact message not found.");
  res.status(200).json({ message });
}

async function listBespokeRequests(req, res) {
  const result = await Dashboard.listBespokeRequests(req.query);
  res.status(200).json({ requests: result.data, meta: result.meta });
}

async function updateBespokeRequestStatus(req, res) {
  const request = await Dashboard.updateBespokeRequestStatus(req.params.id, req.body.status);
  if (!request) throw httpError(404, "Bespoke request not found.");
  res.status(200).json({ request });
}

function createCrudHandlers(model, resourceName) {
  return {
    async create(req, res) {
      const created = await model.create(req.body);
      if (!created) throw httpError(400, `No ${resourceName} fields were provided.`);
      res.status(201).json({ [resourceName]: created });
    },
    async update(req, res) {
      const updated = await model.update(req.params.id, req.body);
      if (!updated) throw httpError(404, `${resourceName} not found or no fields were provided.`);
      res.status(200).json({ [resourceName]: updated });
    },
    async remove(req, res) {
      const removed = await model.remove(req.params.id);
      if (!removed) throw httpError(404, `${resourceName} not found.`);
      res.status(200).json({ message: `${resourceName} deleted.` });
    },
  };
}


async function listUsers(req, res) {
  const result = await User.listUsers(req.query);
  res.status(200).json({ users: result.data, meta: result.meta });
}

async function createUser(req, res) {
  const existing = await User.findByEmail(req.body.email);
  if (existing) throw httpError(409, "A user with this email already exists.");

  if (!["staff", "admin"].includes(req.body.role)) {
    throw httpError(400, "Admin-created accounts must be staff or admin. Guests should register themselves.");
  }

  const passwordHash = await hashPassword(req.body.password || "ChangeMe123!");
  const user = await User.createUser({
    ...req.body,
    membership_level: "team",
    status: "active",
    passwordHash,
  });
  res.status(201).json({ user: pickPublicUser(user) });
}

async function updateUser(req, res) {
  const user = await User.updateUser(req.params.id, req.body);
  if (!user) throw httpError(404, "User not found or no fields were provided.");
  res.status(200).json({ user: pickPublicUser(user) });
}

async function listSettings(req, res) {
  res.status(200).json({ settings: await Dashboard.listSettings() });
}

async function updateSettings(req, res) {
  const entries = Object.entries(req.body || {});
  if (!entries.length) throw httpError(400, "Settings payload cannot be empty.");
  res.status(200).json({ settings: await Dashboard.upsertSettings(entries) });
}

module.exports = {
  amenities,
  experiences,
  gallery,
  getBooking,
  listBespokeRequests,
  listBookings,
  listMessages,
  listSettings,
  listUsers,
  overview,
  createUser,
  suites,
  updateBespokeRequestStatus,
  updateBookingStatus,
  updateMessageStatus,
  updateSettings,
  updateUser,
};
