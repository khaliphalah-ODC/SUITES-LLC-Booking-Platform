const express = require("express");
const { testDatabaseConnection } = require("../config/database");

const router = express.Router();

router.get("/", async (req, res) => {
  const database = await testDatabaseConnection();

  res.status(200).json({
    status: "ok",
    service: "The SUITES API",
    environment: process.env.NODE_ENV || "development",
    database,
  });
});

module.exports = router;
