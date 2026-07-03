const app = require("./app");
const env = require("./config/env");
const { testDatabaseConnection } = require("./config/database");

const PORT = env.port;


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
