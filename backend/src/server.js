require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { testDatabaseConnection } = require("./config/database");
const healthRoutes = require("./routes/health.routes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "The SUITES API is running.",
  });
});

app.use("/api/health", healthRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

async function startServer() {
  const database = await testDatabaseConnection();

  if (database.connected) {
    console.log(`[database] ${database.message}`);
  } else {
    console.warn(`[database] ${database.message}`);
  }

  app.listen(PORT, () => {
    console.log(`[server] The SUITES API is running on port ${PORT}`);
  });
}

startServer();
