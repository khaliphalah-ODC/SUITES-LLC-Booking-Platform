const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { optionalAuthenticate } = require("../middleware/auth.middleware");
const { writeLimiter } = require("../middleware/security.middleware");
const { validateRequest } = require("../middleware/validation.middleware");
const bookings = require("../controllers/bookings.controller");
const {
  checkAvailabilityRules,
  createBookingRules,
} = require("../validators/booking.validator");

const router = express.Router();

router.post(
  "/check-availability",
  writeLimiter,
  checkAvailabilityRules,
  validateRequest,
  asyncHandler(bookings.checkAvailability)
);
router.post(
  "/",
  writeLimiter,
  optionalAuthenticate,
  createBookingRules,
  validateRequest,
  asyncHandler(bookings.create)
);

module.exports = router;
