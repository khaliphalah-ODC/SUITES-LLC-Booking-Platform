const asyncHandler = require("./asyncHandler");
const User = require("../models/user.model");
const { verifyToken } = require("../utils/token");
const { pickPublicUser } = require("../utils/queries");
const httpError = require("../utils/httpError");

const authenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const [, bearerToken] = header.split(" ");
  const token = bearerToken || req.cookies?.access_token;

  if (!token) {
    throw httpError(401, "Authentication required.");
  }

  const payload = verifyToken(token);
  if (!payload?.sub) {
    throw httpError(401, "Invalid or expired token.");
  }

  const user = await User.findById(payload.sub);

  if (!user) {
    throw httpError(401, "User no longer exists.");
  }

  if (user.status === "suspended") {
    throw httpError(403, "This account has been suspended.");
  }

  req.user = pickPublicUser(user);
  next();
});

function optionalAuthenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const [, bearerToken] = header.split(" ");
  const token = bearerToken || req.cookies?.access_token;

  if (!token) return next();

  return authenticate(req, res, next);
}

module.exports = {
  authenticate,
  optionalAuthenticate,
};
