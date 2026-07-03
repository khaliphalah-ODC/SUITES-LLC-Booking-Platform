const { query } = require("../config/database");

async function create({ userId, tokenHash, expiresAt }) {
  const result = await query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, tokenHash, expiresAt]
  );
  return result.rows[0];
}

async function findActiveByHash(tokenHash) {
  const result = await query(
    `SELECT rt.*, u.role
     FROM refresh_tokens rt
     JOIN users u ON u.id = rt.user_id
     WHERE rt.token_hash = $1
       AND rt.revoked_at IS NULL
       AND rt.expires_at > NOW()`,
    [tokenHash]
  );
  return result.rows[0] || null;
}

async function revoke(tokenHash, replacedByTokenHash = null) {
  const result = await query(
    `UPDATE refresh_tokens
     SET revoked_at = NOW(), replaced_by_token_hash = $2
     WHERE token_hash = $1 AND revoked_at IS NULL
     RETURNING *`,
    [tokenHash, replacedByTokenHash]
  );
  return result.rows[0] || null;
}

async function revokeAllForUser(userId) {
  await query(
    `UPDATE refresh_tokens
     SET revoked_at = NOW()
     WHERE user_id = $1 AND revoked_at IS NULL`,
    [userId]
  );
}

module.exports = {
  create,
  findActiveByHash,
  revoke,
  revokeAllForUser,
};
