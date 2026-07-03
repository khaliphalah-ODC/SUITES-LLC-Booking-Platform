const { body } = require("express-validator");

const contactRules = [
  body("name").trim().isLength({ min: 1, max: 120 }),
  body("email").isEmail().normalizeEmail(),
  body("phone").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 40 }),
  body("subject").trim().isLength({ min: 1, max: 160 }),
  body("message").trim().isLength({ min: 1, max: 3000 }),
];


const bespokeRules = [
  body("name").trim().isLength({ min: 1, max: 120 }),
  body("email").isEmail().normalizeEmail(),
  body("phone").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 40 }),
  body("request_type").trim().isLength({ min: 1, max: 80 }),
  body("message").trim().isLength({ min: 1, max: 3000 }),
  body("booking_id").optional({ nullable: true, checkFalsy: true }).isUUID(),
];

const newsletterRules = [
  body("email").isEmail().normalizeEmail(),
  body("name").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 120 }),
];

module.exports = {
  bespokeRules,
  contactRules,
  newsletterRules,
};
