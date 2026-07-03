const { isValidEmail, requireFields } = require("../middleware/validation.middleware");
const Contact = require("../models/contact.model");
const httpError = require("../utils/httpError");

async function createContactMessage(req, res) {
  requireFields(req.body, ["name", "email", "subject", "message"]);

  if (!isValidEmail(req.body.email)) {
    throw httpError(400, "A valid email address is required.");
  }

  const contactMessage = await Contact.createContactMessage(req.body);

  res.status(201).json({ message: "Message received.", contactMessage });
}

async function createBespokeRequest(req, res) {
  requireFields(req.body, ["name", "email", "request_type", "message"]);

  if (!isValidEmail(req.body.email)) {
    throw httpError(400, "A valid email address is required.");
  }

  const request = await Contact.createBespokeRequest({
    ...req.body,
    user_id: req.user?.id || req.body.user_id || null,
  });

  res.status(201).json({ request });
}

async function subscribeNewsletter(req, res) {
  requireFields(req.body, ["email"]);

  if (!isValidEmail(req.body.email)) {
    throw httpError(400, "A valid email address is required.");
  }

  const subscriber = await Contact.subscribeNewsletter(req.body);

  res.status(201).json({ subscriber });
}

module.exports = {
  createBespokeRequest,
  createContactMessage,
  subscribeNewsletter,
};
