const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

function required(name, fallback) {
  const value = process.env[name] || fallback;
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`${name} is required in production.`);
  }
  return value;
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  databaseUrl: required("DATABASE_URL"),
  databaseSsl: process.env.DATABASE_SSL === "true",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  jwtSecret: required("JWT_SECRET", "development-only-secret-change-me"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS || 30),
  cookieSecure: process.env.COOKIE_SECURE === "true",
  taxRate: Number(process.env.TAX_RATE || 0),
  rateLimits: {
    api: Number(process.env.RATE_LIMIT_API_MAX || 300),
    auth: Number(process.env.RATE_LIMIT_AUTH_MAX || 100),
    write: Number(process.env.RATE_LIMIT_WRITE_MAX || 60),
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    folder: process.env.CLOUDINARY_FOLDER || "the-suites",
  },
};

module.exports = env;
