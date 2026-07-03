const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticate } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const { createImageUpload } = require("../middleware/upload.middleware");
const { validateRequest } = require("../middleware/validation.middleware");
const dashboard = require("../controllers/dashboard.controller");
const uploads = require("../controllers/uploads.controller");
const {
  bookingStatusRules,
  messageStatusRules,
  userRules,
  uuidParam,
} = require("../validators/dashboard.validator");

const router = express.Router();
const staffOnly = [authenticate, requireRole("staff", "admin")];
const adminOnly = [authenticate, requireRole("admin")];
const upload = createImageUpload();

router.get("/", staffOnly, asyncHandler(dashboard.overview));
router.get("/bookings", staffOnly, asyncHandler(dashboard.listBookings));
router.get("/bookings/:id", staffOnly, uuidParam, validateRequest, asyncHandler(dashboard.getBooking));
router.patch(
  "/bookings/:id/status",
  staffOnly,
  uuidParam,
  bookingStatusRules,
  validateRequest,
  asyncHandler(dashboard.updateBookingStatus)
);
router.get("/messages", staffOnly, asyncHandler(dashboard.listMessages));
router.patch(
  "/messages/:id/status",
  staffOnly,
  uuidParam,
  messageStatusRules,
  validateRequest,
  asyncHandler(dashboard.updateMessageStatus)
);
router.get("/bespoke-requests", staffOnly, asyncHandler(dashboard.listBespokeRequests));
router.patch(
  "/bespoke-requests/:id/status",
  staffOnly,
  uuidParam,
  messageStatusRules,
  validateRequest,
  asyncHandler(dashboard.updateBespokeRequestStatus)
);

router.post("/suites", adminOnly, asyncHandler(dashboard.suites.create));
router.patch("/suites/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.suites.update));
router.delete("/suites/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.suites.remove));
router.post("/amenities", adminOnly, asyncHandler(dashboard.amenities.create));
router.patch("/amenities/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.amenities.update));
router.delete("/amenities/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.amenities.remove));
router.post("/experiences", adminOnly, asyncHandler(dashboard.experiences.create));
router.patch("/experiences/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.experiences.update));
router.delete("/experiences/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.experiences.remove));
router.post("/gallery", adminOnly, asyncHandler(dashboard.gallery.create));
router.patch("/gallery/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.gallery.update));
router.delete("/gallery/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.gallery.remove));
router.get("/users", adminOnly, asyncHandler(dashboard.listUsers));
router.post("/users", adminOnly, userRules, validateRequest, asyncHandler(dashboard.createUser));
router.patch("/users/:id", adminOnly, uuidParam, validateRequest, asyncHandler(dashboard.updateUser));
router.get("/settings", adminOnly, asyncHandler(dashboard.listSettings));
router.patch("/settings", adminOnly, asyncHandler(dashboard.updateSettings));
router.post("/uploads/image", adminOnly, upload.single("image"), asyncHandler(uploads.uploadImage));

module.exports = router;
