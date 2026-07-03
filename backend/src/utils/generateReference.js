const crypto = require("crypto");

function generateBookingReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `SUITES-${date}-${suffix}`;
}



module.exports = generateBookingReference;




