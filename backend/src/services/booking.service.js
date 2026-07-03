const { getPool } = require("../config/database");
const { getSuiteAvailability, validateStayDates } = require("./availability.service");
const { createNotification } = require("./notification.service");
const { createPaymentPlaceholder } = require("./payment.service");
const generateBookingReference = require("../utils/generateReference");
const httpError = require("../utils/httpError");

function calculateNights(checkInDate, checkOutDate) {
  const { checkIn, checkOut } = validateStayDates(checkInDate, checkOutDate);
  return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
}

async function createBooking(payload) {
  const availability = await getSuiteAvailability({
    suiteTypeId: payload.suite_type_id,
    checkInDate: payload.check_in_date,
    checkOutDate: payload.check_out_date,
    guestCount: payload.guest_count,
  });

  if (!availability.isAvailable) {
    throw httpError(409, "No suites are available for the selected dates.");
  }

  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const nights = calculateNights(payload.check_in_date, payload.check_out_date);
    const subtotal = Number(availability.suite.price_per_night) * nights;
    const taxRate = Number(process.env.TAX_RATE || 0);
    const taxAmount = Number((subtotal * taxRate).toFixed(2));
    const totalAmount = Number((subtotal + taxAmount).toFixed(2));

    const bookingResult = await client.query(
      `INSERT INTO bookings (
        booking_reference, user_id, suite_type_id, guest_first_name, guest_last_name,
        guest_email, guest_phone, check_in_date, check_out_date, guest_count,
        special_requests, status, subtotal, tax_amount, total_amount
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        generateBookingReference(),
        payload.user_id || null,
        availability.suite.id,
        payload.guest_first_name,
        payload.guest_last_name,
        payload.guest_email,
        payload.guest_phone || null,
        payload.check_in_date,
        payload.check_out_date,
        payload.guest_count,
        payload.special_requests || null,
        "pending_payment",
        subtotal,
        taxAmount,
        totalAmount,
      ]
    );

    const booking = bookingResult.rows[0];
    const payment = await createPaymentPlaceholder(client, booking.id, totalAmount);

    await createNotification(client, {
      userId: booking.user_id,
      title: "Booking request received",
      message: `Your reservation ${booking.booking_reference} has been created.`,
      type: "booking",
    });

    await client.query("COMMIT");

    return {
      booking,
      payment,
      nights,
      suite: availability.suite,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  calculateNights,
  createBooking,
};
