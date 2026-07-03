const express = require("express");

const accountRoutes = require("./routes/account.routes");
const authRoutes = require("./routes/auth.routes");
const bookingsRoutes = require("./routes/bookings.routes");
const contactRoutes = require("./routes/contact.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const healthRoutes = require("./routes/health.routes");
const publicRoutes = require("./routes/public.routes");
const { errorHandler, notFoundHandler } = require("./middleware/error.middleware");
const { apiLimiter, applySecurityMiddleware } = require("./middleware/security.middleware");

const app = express();

applySecurityMiddleware(app);
app.use("/api", apiLimiter);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "The SUITES API is running.",
    docs: "/api/health",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", publicRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
