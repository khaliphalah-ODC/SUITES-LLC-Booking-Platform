const Account = require("../models/account.model");
const User = require("../models/user.model");
const { pickPublicUser } = require("../utils/queries");
const httpError = require("../utils/httpError");


async function getAccount(req, res) {
  res.status(200).json({ user: req.user });
}

async function updateAccount(req, res) {
  const user = await User.updateProfile(req.user.id, req.body);
  if (!user) {
    throw httpError(400, "No valid profile fields were provided.");
  }

  res.status(200).json({ user: pickPublicUser(user) });
}

async function listBookings(req, res) {
  res.status(200).json({ bookings: await Account.listBookingsForUser(req.user.id) });
}

async function getBooking(req, res) {
  const booking = await Account.getBookingForUser(req.params.id, req.user.id);

  if (!booking) throw httpError(404, "Booking not found.");
  res.status(200).json({ booking });
}

async function listPayments(req, res) {
  res.status(200).json({ payments: await Account.listPaymentsForUser(req.user.id) });
}

async function listNotifications(req, res) {
  res.status(200).json({ notifications: await Account.listNotificationsForUser(req.user.id) });
}

async function markNotificationRead(req, res) {
  const notification = await Account.markNotificationRead(req.params.id, req.user.id);

  if (!notification) throw httpError(404, "Notification not found.");
  res.status(200).json({ notification });
}

module.exports = {
  getAccount,
  getBooking,
  listBookings,
  listNotifications,
  listPayments,
  markNotificationRead,
  updateAccount,
};



