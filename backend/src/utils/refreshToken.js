const crypto = require("crypto");

function generateRefreshToken() {
  return crypto.randomBytes(48).toString("base64url");
}

function hashRefreshToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function getRefreshTokenExpiry(days) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);
  return expiresAt;
}

module.exports = {
  generateRefreshToken,
  getRefreshTokenExpiry,
  hashRefreshToken,
};
