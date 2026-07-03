const { query } = require("../config/database");
const { escapeLike, paginationMeta, parsePagination } = require("../utils/pagination");
const { buildUpdateSet, pickPublicUser } = require("../utils/queries");

async function findByEmail(email) {
  const result = await query("SELECT * FROM users WHERE LOWER(email) = LOWER($1)", [email]);
  return result.rows[0] || null;
}

async function findById(id) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
}

async function createCustomer({ first_name, last_name, email, phone, passwordHash, membership_level }) {
  const result = await query(
    `INSERT INTO users (first_name, last_name, email, phone, password_hash, role, membership_level)
     VALUES ($1, $2, LOWER($3), $4, $5, 'customer', $6)
     RETURNING *`,
    [first_name, last_name, email, phone || null, passwordHash, membership_level || "standard"]
  );
  return result.rows[0];
}

async function createUser({ first_name, last_name, email, phone, passwordHash, role, membership_level, status }) {
  const result = await query(
    `INSERT INTO users (first_name, last_name, email, phone, password_hash, role, membership_level, status)
     VALUES ($1, $2, LOWER($3), $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      first_name,
      last_name,
      email,
      phone || null,
      passwordHash,
      role || "customer",
      membership_level || "standard",
      status || "active",
    ]
  );
  return result.rows[0];
}

async function updateProfile(id, body) {
  const { assignments, values } = buildUpdateSet(
    ["first_name", "last_name", "phone", "membership_level"],
    body
  );
  if (!assignments.length) return null;

  values.push(id);
  const result = await query(
    `UPDATE users
     SET ${assignments.join(", ")}, updated_at = NOW()
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );
  return result.rows[0] || null;
}

async function updateUser(id, body) {
  const { assignments, values } = buildUpdateSet(
    ["first_name", "last_name", "email", "phone", "role", "membership_level", "status"],
    body
  );
  if (!assignments.length) return null;

  values.push(id);
  const result = await query(
    `UPDATE users
     SET ${assignments.join(", ")}, updated_at = NOW()
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );
  return result.rows[0] || null;
}

async function listUsers(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = [];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(
      `(first_name ILIKE $${values.length} ESCAPE '\\' OR last_name ILIKE $${values.length} ESCAPE '\\' OR email ILIKE $${values.length} ESCAPE '\\')`
    );
  }

  if (filters.role) {
    values.push(filters.role);
    where.push(`role = $${values.length}`);
  }

  if (filters.status) {
    values.push(filters.status);
    where.push(`status = $${values.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await query(`SELECT COUNT(*)::int AS total FROM users ${whereSql}`, values);
  const result = await query(
    `SELECT * FROM users ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );

  return {
    data: result.rows.map(pickPublicUser),
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

module.exports = {
  createCustomer,
  createUser,
  findByEmail,
  findById,
  listUsers,
  updateProfile,
  updateUser,
};
