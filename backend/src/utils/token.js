const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signToken(payload, options = {}) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: options.expiresIn || env.jwtExpiresIn,
    issuer: "the-suites-api",
  });
}


function verifyToken(token) {
  try {
    return jwt.verify(token, env.jwtSecret, { issuer: "the-suites-api" });
  } catch (error) {
    return null;
  }
}

module.exports = {
  signToken,
  verifyToken,
};
