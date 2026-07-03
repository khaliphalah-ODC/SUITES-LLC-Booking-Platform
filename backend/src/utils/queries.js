function buildUpdateSet(fields, body, startIndex = 1) {
  const values = [];
  const assignments = [];

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      values.push(body[field]);
      assignments.push(`${field} = $${startIndex + values.length - 1}`);
    }
  });

  return { assignments, values };
}

function pickPublicUser(user) {
  if (!user) return null;
  const { password_hash, ...publicUser } = user;
  return publicUser;
}

module.exports = {
  buildUpdateSet,
  pickPublicUser,
};
