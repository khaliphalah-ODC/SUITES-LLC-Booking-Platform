const { query } = require("../config/database");
const { escapeLike, paginationMeta, parsePagination } = require("../utils/pagination");
const { buildUpdateSet } = require("../utils/queries");

async function countOverview() {
  const [bookings, suites, activeSuites, messages, requests, revenue, arrivalsToday, pendingBookings, occupiedToday] = await Promise.all([
    query("SELECT COUNT(*)::int AS count FROM bookings"),
    query("SELECT COUNT(*)::int AS count FROM suite_types"),
    query("SELECT COALESCE(SUM(quantity), 0)::int AS count FROM suite_types WHERE status = 'active'"),
    query("SELECT COUNT(*)::int AS count FROM contact_messages WHERE status = 'new'"),
    query("SELECT COUNT(*)::int AS count FROM bespoke_requests WHERE status = 'new'"),
    query(
      "SELECT COALESCE(SUM(total_amount), 0)::numeric AS total FROM bookings WHERE status IN ('paid', 'confirmed', 'completed')"
    ),
    query("SELECT COUNT(*)::int AS count FROM bookings WHERE check_in_date = CURRENT_DATE"),
    query("SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'pending_payment'"),
    query(
      `SELECT COUNT(*)::int AS count
       FROM bookings
       WHERE status IN ('paid', 'confirmed')
       AND check_in_date <= CURRENT_DATE
       AND check_out_date > CURRENT_DATE`
    ),
  ]);

  const activeSuiteCount = activeSuites.rows[0].count;
  const occupiedCount = occupiedToday.rows[0].count;

  return {
    bookings: bookings.rows[0].count,
    suites: suites.rows[0].count,
    activeSuites: activeSuiteCount,
    newMessages: messages.rows[0].count,
    newRequests: requests.rows[0].count,
    totalRevenue: Number(revenue.rows[0].total || 0),
    arrivalsToday: arrivalsToday.rows[0].count,
    pendingBookings: pendingBookings.rows[0].count,
    occupiedToday: occupiedCount,
    occupancyRate: activeSuiteCount > 0 ? Math.round((occupiedCount / activeSuiteCount) * 1000) / 10 : 0,
  };
}

async function listDashboardBookings(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = [];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(
      `(b.booking_reference ILIKE $${values.length} ESCAPE '\\' OR b.guest_email ILIKE $${values.length} ESCAPE '\\' OR b.guest_first_name ILIKE $${values.length} ESCAPE '\\' OR b.guest_last_name ILIKE $${values.length} ESCAPE '\\')`
    );
  }

  if (filters.status) {
    values.push(filters.status);
    where.push(`b.status = $${values.length}`);
  }

  if (filters.suite_type_id) {
    values.push(filters.suite_type_id);
    where.push(`b.suite_type_id = $${values.length}`);
  }

  if (filters.date_from) {
    values.push(filters.date_from);
    where.push(`b.check_in_date >= $${values.length}`);
  }

  if (filters.date_to) {
    values.push(filters.date_to);
    where.push(`b.check_out_date <= $${values.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await query(
    `SELECT COUNT(*)::int AS total
     FROM bookings b
     JOIN suite_types st ON st.id = b.suite_type_id
     LEFT JOIN users u ON u.id = b.user_id
     ${whereSql}`,
    values
  );
  const result = await query(
    `SELECT b.*, st.name AS suite_name, u.email AS account_email
     FROM bookings b
     JOIN suite_types st ON st.id = b.suite_type_id
     LEFT JOIN users u ON u.id = b.user_id
     ${whereSql}
     ORDER BY b.created_at DESC
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );
  return {
    data: result.rows,
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

async function getDashboardBooking(id) {
  const result = await query(
    `SELECT b.*, st.name AS suite_name, p.payment_status, p.amount AS payment_amount
     FROM bookings b
     JOIN suite_types st ON st.id = b.suite_type_id
     LEFT JOIN payments p ON p.booking_id = b.id
     WHERE b.id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

async function updateBookingStatus(id, status) {
  const result = await query(
    "UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0] || null;
}

async function listMessages(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = [];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(`(name ILIKE $${values.length} ESCAPE '\\' OR email ILIKE $${values.length} ESCAPE '\\' OR subject ILIKE $${values.length} ESCAPE '\\' OR message ILIKE $${values.length} ESCAPE '\\')`);
  }

  if (filters.status) {
    values.push(filters.status);
    where.push(`status = $${values.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await query(`SELECT COUNT(*)::int AS total FROM contact_messages ${whereSql}`, values);
  const result = await query(
    `SELECT * FROM contact_messages ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );
  return {
    data: result.rows,
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

async function updateMessageStatus(id, status) {
  const result = await query("UPDATE contact_messages SET status = $1 WHERE id = $2 RETURNING *", [
    status,
    id,
  ]);
  return result.rows[0] || null;
}

async function listBespokeRequests(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = [];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(`(name ILIKE $${values.length} ESCAPE '\\' OR email ILIKE $${values.length} ESCAPE '\\' OR message ILIKE $${values.length} ESCAPE '\\')`);
  }

  if (filters.status) {
    values.push(filters.status);
    where.push(`status = $${values.length}`);
  }

  if (filters.request_type) {
    values.push(filters.request_type);
    where.push(`request_type = $${values.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await query(`SELECT COUNT(*)::int AS total FROM bespoke_requests ${whereSql}`, values);
  const result = await query(
    `SELECT * FROM bespoke_requests ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );
  return {
    data: result.rows,
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

async function updateBespokeRequestStatus(id, status) {
  const result = await query("UPDATE bespoke_requests SET status = $1 WHERE id = $2 RETURNING *", [
    status,
    id,
  ]);
  return result.rows[0] || null;
}

function crud(table, fields, options = {}) {
  return {
    async create(body) {
      const provided = fields.filter((field) => body[field] !== undefined);
      if (!provided.length) return null;
      const values = provided.map((field) => body[field]);
      const placeholders = provided.map((_, index) => `$${index + 1}`);
      const result = await query(
        `INSERT INTO ${table} (${provided.join(", ")})
         VALUES (${placeholders.join(", ")})
         RETURNING *`,
        values
      );
      return result.rows[0];
    },
    async update(id, body) {
      const { assignments, values } = buildUpdateSet(fields, body);
      if (!assignments.length) return null;
      values.push(id);
      const timestampUpdate = options.hasUpdatedAt ? ", updated_at = NOW()" : "";
      const result = await query(
        `UPDATE ${table}
         SET ${assignments.join(", ")}${timestampUpdate}
         WHERE id = $${values.length}
         RETURNING *`,
        values
      );
      return result.rows[0] || null;
    },
    async remove(id) {
      const result = await query(`DELETE FROM ${table} WHERE id = $1 RETURNING id`, [id]);
      return result.rows[0] || null;
    },
  };
}

async function listSettings() {
  const result = await query("SELECT * FROM settings ORDER BY key");
  return result.rows;
}

async function upsertSettings(entries) {
  const updated = [];
  for (const [key, value] of entries) {
    const result = await query(
      `INSERT INTO settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
       RETURNING *`,
      [key, JSON.stringify(value)]
    );
    updated.push(result.rows[0]);
  }
  return updated;
}

module.exports = {
  countOverview,
  crud,
  getDashboardBooking,
  listBespokeRequests,
  listDashboardBookings,
  listMessages,
  listSettings,
  updateBespokeRequestStatus,
  updateBookingStatus,
  updateMessageStatus,
  upsertSettings,
};
