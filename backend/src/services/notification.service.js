const { query } = require("../config/database");

async function createNotification(client, { userId, title, message, type = "system" }) {
  if (!userId) return null;

  const executor = client || { query };
  const result = await executor.query(
    `INSERT INTO notifications (user_id, title, message, type)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, title, message, type]
  );

  return result.rows[0];
}

module.exports = {
  createNotification,
};
