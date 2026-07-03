const { body, param } = require("express-validator");

const updateAccountRules = [
  body("first_name").optional().trim().isLength({ min: 1, max: 80 }),
  body("last_name").optional().trim().isLength({ min: 1, max: 80 }),
  body("phone").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 40 }),
  body("membership_level").optional().trim().isLength({ min: 1, max: 80 }),
];

const uuidParam = [param("id").isUUID()];

module.exports = {
  updateAccountRules,
  uuidParam,
};
