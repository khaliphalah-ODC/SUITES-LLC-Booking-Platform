const { query } = require("../config/database");
const httpError = require("../utils/httpError");

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value || "")
  );
}

function validateStayDates(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    throw httpError(400, "Check-in and check-out dates must be valid dates.");
  }

  if (checkOut <= checkIn) {
    throw httpError(400, "Check-out date must be after check-in date.");
  }

  return { checkIn, checkOut };
}

async function getSuiteAvailability({ suiteTypeId, checkInDate, checkOutDate, guestCount }) {
  validateStayDates(checkInDate, checkOutDate);
  const suiteTypeUuid = isUuid(suiteTypeId) ? suiteTypeId : null;
  const suiteTypeSlug = suiteTypeUuid ? null : suiteTypeId;

  const suiteResult = await query(
    `SELECT id, name, slug, price_per_night, quantity, max_guests, status
     FROM suite_types
     WHERE ($1::uuid IS NOT NULL AND id = $1::uuid)
        OR ($2::text IS NOT NULL AND slug = $2)
     LIMIT 1`,
    [suiteTypeUuid, suiteTypeSlug || null]
  );

  const suite = suiteResult.rows[0];
  if (!suite || suite.status !== "active") {
    throw httpError(404, "Suite type is not available.");
  }

  if (guestCount && Number(guestCount) > Number(suite.max_guests)) {
    throw httpError(400, "Guest count exceeds this suite type's capacity.");
  }

  const bookedResult = await query(
    `SELECT COUNT(*)::int AS booked_count
     FROM bookings
     WHERE suite_type_id = $1
       AND status NOT IN ('cancelled')
       AND check_in_date < $3
       AND check_out_date > $2`,
    [suite.id, checkInDate, checkOutDate]
  );

  const bookedCount = bookedResult.rows[0].booked_count;
  const availableCount = Math.max(Number(suite.quantity) - bookedCount, 0);

  return {
    suite,
    bookedCount,
    availableCount,
    isAvailable: availableCount > 0,
  };
}

module.exports = {
  getSuiteAvailability,
  validateStayDates,
};
