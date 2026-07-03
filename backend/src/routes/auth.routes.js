const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticate } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/security.middleware");
const { validateRequest } = require("../middleware/validation.middleware");
const auth = require("../controllers/auth.controller");
const { loginRules, registerRules } = require("../validators/auth.validator");

const router = express.Router();

router.post("/register", authLimiter, registerRules, validateRequest, asyncHandler(auth.register));
router.post("/login", authLimiter, loginRules, validateRequest, asyncHandler(auth.login));
router.post("/refresh", authLimiter, asyncHandler(auth.refresh));
router.post("/logout", asyncHandler(auth.logout));
router.get("/me", authenticate, asyncHandler(auth.me));

module.exports = router;
