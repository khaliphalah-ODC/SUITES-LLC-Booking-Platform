const { query } = require("../config/database");

async function createPaymentPlaceholder(client, bookingId, amount) {
  const executor = client || { query };
  const result = await executor.query(
    `INSERT INTO payments (
      booking_id, amount, payment_method, payment_provider, payment_status, transaction_reference
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [bookingId, amount, "placeholder", "manual_v1", "not_started", null]
  );

  return result.rows[0];
}

module.exports = {
  createPaymentPlaceholder,
};
