const httpError = require("../utils/httpError");

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(httpError(401, "Authentication required."));
    }

    if (!roles.includes(req.user.role)) {
      return next(httpError(403, "You do not have permission to access this resource."));
    }

    return next();
  };
}

module.exports = {
  requireRole,
};
