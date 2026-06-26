const { Pool } = require("pg");

const databaseUrl = process.env.DATABASE_URL;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
    })
  : null;

async function testDatabaseConnection() {
  if (!pool) {
    return {
      connected: false,
      message: "DATABASE_URL is not set.",
    };
  }

  try {
    const result = await pool.query("SELECT NOW() AS now");

    return {
      connected: true,
      message: "Database connection successful.",
      timestamp: result.rows[0].now,
    };
  } catch (error) {
    return {
      connected: false,
      message: error.message,
    };
  }
}

module.exports = {
  pool,
  testDatabaseConnection,
};
