const { JWT_SECRET, JWT_REFRESH } = process.env;
module.exports = {
  jwtSecret: JWT_SECRET,
  jwtRefresh: JWT_REFRESH,
};
