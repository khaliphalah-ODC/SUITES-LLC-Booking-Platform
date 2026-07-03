const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticate } = require("../middleware/auth.middleware");
const { validateRequest } = require("../middleware/validation.middleware");
const account = require("../controllers/account.controller");
const { updateAccountRules, uuidParam } = require("../validators/account.validator");

const router = express.Router();

router.use(authenticate);
router.get("/", asyncHandler(account.getAccount));
router.patch("/", updateAccountRules, validateRequest, asyncHandler(account.updateAccount));
router.get("/bookings", asyncHandler(account.listBookings));
router.get("/bookings/:id", uuidParam, validateRequest, asyncHandler(account.getBooking));
router.get("/payments", asyncHandler(account.listPayments));
router.get("/notifications", asyncHandler(account.listNotifications));
router.patch(
  "/notifications/:id/read",
  uuidParam,
  validateRequest,
  asyncHandler(account.markNotificationRead)
);

module.exports = router;
