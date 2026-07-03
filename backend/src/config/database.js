const { Pool } = require("pg");
const env = require("./env");

const databaseUrl = env.databaseUrl;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      max: 5,
      ssl: env.databaseSsl ? { rejectUnauthorized: false } : undefined,
    })
  : null;

function isConnectionError(error) {
  const code = error?.code;
  return ["ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "ENETUNREACH", "EAI_AGAIN", "ENOTFOUND"].includes(code);
}

function normalizeDatabaseError(error) {
  if (isConnectionError(error) || error?.errors?.some?.(isConnectionError)) {
    const serviceError = new Error("Database connection failed. Please try again in a few seconds.");
    serviceError.statusCode = 503;
    serviceError.cause = error;
    return serviceError;
  }

  return error;
}

function getPool() {
  if (!pool) {
    const error = new Error("DATABASE_URL is not set.");
    error.statusCode = 503;
    throw error;
  }

  return pool;
}

async function query(text, params) {
  const activePool = getPool();
  let lastError;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await activePool.query(text, params);
    } catch (error) {
      lastError = error;
      if (!isConnectionError(error) && !error?.errors?.some?.(isConnectionError)) break;
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  throw normalizeDatabaseError(lastError);
}

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
  getPool,
  pool,
  query,
  testDatabaseConnection,
};
