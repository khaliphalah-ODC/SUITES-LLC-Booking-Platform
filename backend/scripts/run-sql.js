require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

async function main() {
  const relativeFilePaths = process.argv.slice(2);

  if (!relativeFilePaths.length) {
    throw new Error("At least one SQL file path is required.");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it to backend/.env.");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();

  try {
    for (const relativeFilePath of relativeFilePaths) {
      const filePath = path.resolve(process.cwd(), relativeFilePath);
      const sql = fs.readFileSync(filePath, "utf8");
      await client.query(sql);
      console.log(`Executed ${relativeFilePath}`);
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  if (error.message.includes("permission denied for schema public")) {
    console.error(
      [
        "Database user does not have CREATE permission on schema public.",
        "",
        "Run this once from your terminal, then retry npm run db:migrate:",
        'sudo -u postgres psql -d suites_hotel -c "ALTER DATABASE suites_hotel OWNER TO suites_user; GRANT ALL PRIVILEGES ON DATABASE suites_hotel TO suites_user; GRANT USAGE, CREATE ON SCHEMA public TO suites_user; ALTER SCHEMA public OWNER TO suites_user;"',
      ].join("\n")
    );
    process.exit(1);
  }

  console.error(error.message);
  process.exit(1);
});
