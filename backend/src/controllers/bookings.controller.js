const { getSuiteAvailability } = require("../services/availability.service");
const { createBooking } = require("../services/booking.service");
const { isValidEmail, requireFields } = require("../middleware/validation.middleware");
const httpError = require("../utils/httpError");

async function checkAvailability(req, res) {
  requireFields(req.body, ["suite_type_id", "check_in_date", "check_out_date", "guest_count"]);

  const availability = await getSuiteAvailability({
    suiteTypeId: req.body.suite_type_id,
    checkInDate: req.body.check_in_date,
    checkOutDate: req.body.check_out_date,
    guestCount: req.body.guest_count,
  });

  res.status(200).json({ availability });
}

async function create(req, res) {
  requireFields(req.body, [
    "suite_type_id",
    "guest_first_name",
    "guest_last_name",
    "guest_email",
    "check_in_date",
    "check_out_date",
    "guest_count",
  ]);

  if (!isValidEmail(req.body.guest_email)) {
    throw httpError(400, "A valid guest email address is required.");
  }

  const bookingUserId = req.user?.role === "customer" ? req.user.id : null;
  const booking = await createBooking({
    ...req.body,
    user_id: bookingUserId,
  });

  res.status(201).json(booking);
}

module.exports = {
  checkAvailability,
  create,
};
