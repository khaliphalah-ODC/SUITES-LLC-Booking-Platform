const { body, param } = require("express-validator");

const uuidParam = [param("id").isUUID()];
const statusRule = (allowed) => [body("status").isIn(allowed)];

const bookingStatusRules = statusRule([
  "pending_payment",
  "paid",
  "confirmed",
  "cancelled",
  "completed",
]);
const messageStatusRules = statusRule(["new", "read", "resolved"]);

const userRules = [
  body("first_name").trim().isLength({ min: 1, max: 80 }),
  body("last_name").trim().isLength({ min: 1, max: 80 }),
  body("email").isEmail().normalizeEmail(),
  body("phone").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 40 }),
  body("role").optional().isIn(["customer", "staff", "admin"]),
  body("status").optional().isIn(["active", "suspended"]),
  body("password").optional().isLength({ min: 8 }),
];

module.exports = {
  bookingStatusRules,
  messageStatusRules,
  userRules,
  uuidParam,
};
