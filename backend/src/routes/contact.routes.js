const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { writeLimiter } = require("../middleware/security.middleware");
const { validateRequest } = require("../middleware/validation.middleware");
const contact = require("../controllers/contact.controller");
const { contactRules } = require("../validators/contact.validator");

const router = express.Router();

router.post("/", writeLimiter, contactRules, validateRequest, asyncHandler(contact.createContactMessage));

module.exports = router;
