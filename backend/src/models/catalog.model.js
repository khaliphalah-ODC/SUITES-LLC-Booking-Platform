const { query } = require("../config/database");
const { escapeLike, paginationMeta, parsePagination } = require("../utils/pagination");

async function listSuites(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = ["st.status = 'active'"];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(
      `(st.name ILIKE $${values.length} ESCAPE '\\' OR st.short_description ILIKE $${values.length} ESCAPE '\\' OR st.description ILIKE $${values.length} ESCAPE '\\')`
    );
  }

  if (filters.max_guests) {
    values.push(Number(filters.max_guests));
    where.push(`st.max_guests >= $${values.length}`);
  }

  if (filters.min_price) {
    values.push(Number(filters.min_price));
    where.push(`st.price_per_night >= $${values.length}`);
  }

  if (filters.max_price) {
    values.push(Number(filters.max_price));
    where.push(`st.price_per_night <= $${values.length}`);
  }

  const sortMap = {
    featured: "st.featured DESC, st.price_per_night ASC",
    newest: "st.created_at DESC",
    price_asc: "st.price_per_night ASC",
    price_desc: "st.price_per_night DESC",
  };
  const orderBy = sortMap[filters.sort] || sortMap.featured;
  const whereSql = where.join(" AND ");

  const countResult = await query(`SELECT COUNT(*)::int AS total FROM suite_types st WHERE ${whereSql}`, values);
  const result = await query(
    `SELECT st.*,
      COALESCE(
        JSON_AGG(si ORDER BY si.sort_order) FILTER (WHERE si.id IS NOT NULL),
        '[]'
      ) AS images
     FROM suite_types st
     LEFT JOIN suite_images si ON si.suite_type_id = st.id
     WHERE ${whereSql}
     GROUP BY st.id
     ORDER BY ${orderBy}
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );

  return {
    data: result.rows,
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

async function getSuiteBySlug(slug) {
  const result = await query(
    `SELECT st.*,
      COALESCE(JSON_AGG(DISTINCT si) FILTER (WHERE si.id IS NOT NULL), '[]') AS images,
      COALESCE(JSON_AGG(DISTINCT a) FILTER (WHERE a.id IS NOT NULL), '[]') AS amenities
     FROM suite_types st
     LEFT JOIN suite_images si ON si.suite_type_id = st.id
     LEFT JOIN suite_amenities sa ON sa.suite_type_id = st.id
     LEFT JOIN amenities a ON a.id = sa.amenity_id
     WHERE st.slug = $1
     GROUP BY st.id`,
    [slug]
  );
  return result.rows[0] || null;
}

async function listAmenities(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = [];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(`(name ILIKE $${values.length} ESCAPE '\\' OR description ILIKE $${values.length} ESCAPE '\\')`);
  }

  if (filters.category) {
    values.push(filters.category);
    where.push(`category = $${values.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await query(`SELECT COUNT(*)::int AS total FROM amenities ${whereSql}`, values);
  const result = await query(
    `SELECT * FROM amenities ${whereSql}
     ORDER BY category, name
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );

  return {
    data: result.rows,
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

async function listExperiences(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = ["status = 'active'"];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(`(title ILIKE $${values.length} ESCAPE '\\' OR description ILIKE $${values.length} ESCAPE '\\')`);
  }

  if (filters.category) {
    values.push(filters.category);
    where.push(`category = $${values.length}`);
  }

  const whereSql = where.join(" AND ");
  const countResult = await query(`SELECT COUNT(*)::int AS total FROM experiences WHERE ${whereSql}`, values);
  const result = await query(
    `SELECT * FROM experiences
     WHERE ${whereSql}
     ORDER BY created_at DESC
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );

  return {
    data: result.rows,
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

async function listGallery(filters = {}) {
  const { page, limit, offset } = parsePagination(filters);
  const where = [];
  const values = [];

  if (filters.search) {
    values.push(`%${escapeLike(filters.search)}%`);
    where.push(`(title ILIKE $${values.length} ESCAPE '\\' OR alt_text ILIKE $${values.length} ESCAPE '\\')`);
  }

  if (filters.category) {
    values.push(filters.category);
    where.push(`category = $${values.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await query(`SELECT COUNT(*)::int AS total FROM gallery_images ${whereSql}`, values);
  const result = await query(
    `SELECT * FROM gallery_images ${whereSql}
     ORDER BY sort_order, created_at DESC
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset]
  );

  return {
    data: result.rows,
    meta: paginationMeta({ page, limit, total: countResult.rows[0].total }),
  };
}

module.exports = {
  getSuiteBySlug,
  listAmenities,
  listExperiences,
  listGallery,
  listSuites,
};
