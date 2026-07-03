const { query } = require("../config/database");

async function createContactMessage({ name, email, phone, subject, message }) {
  const result = await query(
    `INSERT INTO contact_messages (name, email, phone, subject, message, status)
     VALUES ($1, LOWER($2), $3, $4, $5, 'new')
     RETURNING *`,
    [name, email, phone || null, subject, message]
  );
  return result.rows[0];
}

async function createBespokeRequest({ user_id, booking_id, name, email, phone, request_type, message }) {
  const result = await query(
    `INSERT INTO bespoke_requests (
      user_id, booking_id, name, email, phone, request_type, message, status
     )
     VALUES ($1, $2, $3, LOWER($4), $5, $6, $7, 'new')
     RETURNING *`,
    [user_id || null, booking_id || null, name, email, phone || null, request_type, message]
  );
  return result.rows[0];
}

async function subscribeNewsletter({ email, name }) {
  const result = await query(
    `INSERT INTO newsletter_subscribers (email, name)
     VALUES (LOWER($1), $2)
     ON CONFLICT (email) DO UPDATE SET name = COALESCE(EXCLUDED.name, newsletter_subscribers.name)
     RETURNING *`,
    [email, name || null]
  );
  return result.rows[0];
}

module.exports = {
  createBespokeRequest,
  createContactMessage,
  subscribeNewsletter,
};
