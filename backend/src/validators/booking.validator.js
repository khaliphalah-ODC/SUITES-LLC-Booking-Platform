const { body } = require("express-validator");

const stayRules = [
  body("suite_type_id").notEmpty(),
  body("check_in_date").isISO8601().toDate(),
  body("check_out_date").isISO8601().toDate(),
  body("guest_count").isInt({ min: 1 }).toInt(),
];

const createBookingRules = [
  ...stayRules,
  body("guest_first_name").trim().isLength({ min: 1, max: 80 }),
  body("guest_last_name").trim().isLength({ min: 1, max: 80 }),
  body("guest_email").isEmail().normalizeEmail(),
  body("guest_phone").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 40 }),
  body("special_requests").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 2000 }),
];

module.exports = {
  checkAvailabilityRules: stayRules,
  createBookingRules,
};
