const { body } = require("express-validator");

const registerRules = [
  body("first_name").trim().isLength({ min: 1, max: 80 }),
  body("last_name").trim().isLength({ min: 1, max: 80 }),
  body("email").isEmail().normalizeEmail(),
  body("phone").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 40 }),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  }),
];

const loginRules = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 1 }),
];

module.exports = {
  loginRules,
  registerRules,
};
