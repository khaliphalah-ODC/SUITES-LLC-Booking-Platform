const { query } = require("../config/database");

async function listBookingsForUser(userId) {
  const result = await query(
    `SELECT b.*, st.name AS suite_name, st.slug AS suite_slug
     FROM bookings b
     JOIN suite_types st ON st.id = b.suite_type_id
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [userId]
  );
  return result.rows;
}

async function getBookingForUser(id, userId) {
  const result = await query(
    `SELECT b.*, st.name AS suite_name, st.slug AS suite_slug
     FROM bookings b
     JOIN suite_types st ON st.id = b.suite_type_id
     WHERE b.id = $1 AND b.user_id = $2`,
    [id, userId]
  );
  return result.rows[0] || null;
}

async function listPaymentsForUser(userId) {
  const result = await query(
    `SELECT p.*, b.booking_reference
     FROM payments p
     JOIN bookings b ON b.id = p.booking_id
     WHERE b.user_id = $1
     ORDER BY p.created_at DESC`,
    [userId]
  );
  return result.rows;
}

async function listNotificationsForUser(userId) {
  const result = await query(
    "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
}

async function markNotificationRead(id, userId) {
  const result = await query(
    `UPDATE notifications
     SET is_read = TRUE
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );
  return result.rows[0] || null;
}

module.exports = {
  getBookingForUser,
  listBookingsForUser,
  listNotificationsForUser,
  listPaymentsForUser,
  markNotificationRead,
};
