const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { writeLimiter } = require("../middleware/security.middleware");
const { validateRequest } = require("../middleware/validation.middleware");
const publicController = require("../controllers/public.controller");
const contactController = require("../controllers/contact.controller");
const { bespokeRules, newsletterRules } = require("../validators/contact.validator");

const router = express.Router();

router.get("/suites", asyncHandler(publicController.listSuites));
router.get("/suites/:slug", asyncHandler(publicController.getSuiteBySlug));
router.get("/amenities", asyncHandler(publicController.listAmenities));
router.get("/experiences", asyncHandler(publicController.listExperiences));
router.get("/gallery", asyncHandler(publicController.listGallery));
router.post(
  "/bespoke-requests",
  writeLimiter,
  bespokeRules,
  validateRequest,
  asyncHandler(contactController.createBespokeRequest)
);
router.post(
  "/newsletter",
  writeLimiter,
  newsletterRules,
  validateRequest,
  asyncHandler(contactController.subscribeNewsletter)
);

module.exports = router;
