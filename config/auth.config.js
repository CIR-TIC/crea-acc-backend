module.exports = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: 900 * 7,
  jwtRefreshExpiration: 2592000,
}