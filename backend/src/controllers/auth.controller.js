const { isValidEmail, requireFields } = require("../middleware/validation.middleware");
const RefreshToken = require("../models/refreshToken.model");
const User = require("../models/user.model");
const { hashPassword, verifyPassword } = require("../utils/password");
const { pickPublicUser } = require("../utils/queries");
const { signToken } = require("../utils/token");
const {
  generateRefreshToken,
  getRefreshTokenExpiry,
  hashRefreshToken,
} = require("../utils/refreshToken");
const httpError = require("../utils/httpError");
const env = require("../config/env");

function setAuthCookie(res, token) {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSecure ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  });
}

function setRefreshCookie(res, token) {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSecure ? "none" : "lax",
    maxAge: env.refreshTokenDays * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  });
}

async function issueTokens(res, user) {
  const accessToken = signToken({ sub: user.id, role: user.role });
  const refreshToken = generateRefreshToken();

  await RefreshToken.create({
    userId: user.id,
    tokenHash: hashRefreshToken(refreshToken),
    expiresAt: getRefreshTokenExpiry(env.refreshTokenDays),
  });

  setAuthCookie(res, accessToken);
  setRefreshCookie(res, refreshToken);

  return { accessToken, refreshToken };
}

async function register(req, res) {
  requireFields(req.body, ["first_name", "last_name", "email", "password"]);

  if (!isValidEmail(req.body.email)) {
    throw httpError(400, "A valid email address is required.");
  }

  if (String(req.body.password).length < 8) {
    throw httpError(400, "Password must be at least 8 characters.");
  }

  const existing = await User.findByEmail(req.body.email);
  if (existing) {
    throw httpError(409, "An account with this email already exists.");
  }

  const passwordHash = await hashPassword(req.body.password);
  const created = await User.createCustomer({ ...req.body, passwordHash });

  const user = pickPublicUser(created);
  const { accessToken, refreshToken } = await issueTokens(res, user);

  res.status(201).json({ user, token: accessToken, accessToken, refreshToken });
}

async function login(req, res) {
  requireFields(req.body, ["email", "password"]);

  const user = await User.findByEmail(req.body.email);

  if (!user || !(await verifyPassword(req.body.password, user.password_hash))) {
    throw httpError(401, "Invalid email or password.");
  }

  if (user.status === "suspended") {
    throw httpError(403, "This account has been suspended. Please contact The SUITES administrator.");
  }

  const publicUser = pickPublicUser(user);
  const { accessToken, refreshToken } = await issueTokens(res, publicUser);

  res.status(200).json({ user: publicUser, token: accessToken, accessToken, refreshToken });
}

async function logout(req, res) {
  const refreshToken = req.body.refreshToken || req.cookies?.refresh_token;
  if (refreshToken) {
    await RefreshToken.revoke(hashRefreshToken(refreshToken));
  }

  res.clearCookie("access_token");
  res.clearCookie("refresh_token", { path: "/api/auth" });
  res.status(200).json({ message: "Logged out." });
}

async function refresh(req, res) {
  const refreshToken = req.body.refreshToken || req.cookies?.refresh_token;
  if (!refreshToken) throw httpError(401, "Refresh token is required.");

  const currentHash = hashRefreshToken(refreshToken);
  const stored = await RefreshToken.findActiveByHash(currentHash);
  if (!stored) throw httpError(401, "Invalid or expired refresh token.");

  const user = await User.findById(stored.user_id);
  if (!user) throw httpError(401, "User no longer exists.");

  const nextRefreshToken = generateRefreshToken();
  const nextRefreshHash = hashRefreshToken(nextRefreshToken);

  await RefreshToken.revoke(currentHash, nextRefreshHash);
  await RefreshToken.create({
    userId: user.id,
    tokenHash: nextRefreshHash,
    expiresAt: getRefreshTokenExpiry(env.refreshTokenDays),
  });

  const publicUser = pickPublicUser(user);
  const accessToken = signToken({ sub: user.id, role: user.role });
  setAuthCookie(res, accessToken);
  setRefreshCookie(res, nextRefreshToken);

  res.status(200).json({
    user: publicUser,
    token: accessToken,
    accessToken,
    refreshToken: nextRefreshToken,
  });
}

async function me(req, res) {
  res.status(200).json({ user: req.user });
}

module.exports = {
  login,
  logout,
  me,
  refresh,
  register,
};
