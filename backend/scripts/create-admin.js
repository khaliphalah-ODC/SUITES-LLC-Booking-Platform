require("dotenv").config();

const { pool, query } = require("../src/config/database");
const { hashPassword } = require("../src/utils/password");

function readArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length).trim() : "";
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || readArg("email")).trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || readArg("password");
  const firstName = process.env.ADMIN_FIRST_NAME || readArg("first-name") || "Admin";
  const lastName = process.env.ADMIN_LAST_NAME || readArg("last-name") || "User";
  const phone = process.env.ADMIN_PHONE || readArg("phone") || null;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required. Example: ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD='ChangeMe123!' npm run admin:create"
    );
  }

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  }

  const passwordHash = await hashPassword(password);
  const result = await query(
    `INSERT INTO users (first_name, last_name, email, phone, password_hash, role, membership_level, status)
     VALUES ($1, $2, LOWER($3), $4, $5, 'admin', 'standard', 'active')
     ON CONFLICT (email) DO UPDATE SET
       first_name = EXCLUDED.first_name,
       last_name = EXCLUDED.last_name,
       phone = EXCLUDED.phone,
       password_hash = EXCLUDED.password_hash,
       role = 'admin',
       status = 'active',
       updated_at = NOW()
     RETURNING id, email, role, status`,
    [firstName, lastName, email, phone, passwordHash]
  );

  const user = result.rows[0];
  console.log(`Admin ready: ${user.email} (${user.role}, ${user.status})`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (pool) await pool.end();
  });
