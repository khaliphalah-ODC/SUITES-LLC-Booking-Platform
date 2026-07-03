const httpError = require("../utils/httpError");
const { validationResult } = require("express-validator");

function requireFields(source, fields) {
  const missing = fields.filter((field) => {
    const value = source[field];
    return value === undefined || value === null || value === "";
  });

  if (missing.length) {
    throw httpError(400, "Missing required fields.", { fields: missing });
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

module.exports = {
  isValidEmail,
  requireFields,
  validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return next(
      httpError(400, "Validation failed.", {
        fields: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      })
    );
  },
  toPositiveInt,
};
