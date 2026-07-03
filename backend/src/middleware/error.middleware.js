function notFoundHandler(req, res) {
  res.status(404).json({
    message: "Route not found.",
  });
}

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    message: error.message || "Something went wrong.",
    details: error.details,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
