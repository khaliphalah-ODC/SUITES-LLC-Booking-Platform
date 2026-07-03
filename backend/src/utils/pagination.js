function parsePagination(query) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 12, 1), 100);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

function paginationMeta({ page, limit, total }) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPreviousPage: page > 1,
  };
}

function escapeLike(value) {
  return String(value).replace(/[\\%_]/g, "\\$&");
}

module.exports = {
  escapeLike,
  paginationMeta,
  parsePagination,
};
