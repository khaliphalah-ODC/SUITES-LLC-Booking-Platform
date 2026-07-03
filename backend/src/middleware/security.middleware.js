const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const pinoHttp = require("pino-http");
const env = require("../config/env");

const corsOptions = {
  origin(origin, callback) {
    const allowed = env.frontendUrl.split(",").map((item) => item.trim());
    if (!origin || allowed.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS."));
  },
  credentials: true,
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.nodeEnv === "production" ? 300 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.nodeEnv === "production" ? 20 : 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.nodeEnv === "production" ? 60 : 300,
  standardHeaders: true,
  legacyHeaders: false,
});

function applySecurityMiddleware(app) {
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );
  app.use(cors(corsOptions));
  app.use(compression());
  app.use(cookieParser());
  app.use(hpp());
  app.use(
    pinoHttp({
      level: env.nodeEnv === "production" ? "info" : "debug",
      redact: ["req.headers.authorization", "req.headers.cookie"],
    })
  );
}

module.exports = {
  apiLimiter,
  applySecurityMiddleware,
  authLimiter,
  writeLimiter,
};
