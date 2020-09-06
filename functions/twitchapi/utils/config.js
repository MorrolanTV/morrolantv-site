exports.BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888'
    : process.env.BASE_URL

exports.COOKIE_SECURE = process.env.NODE_ENV !== 'development'

exports.ENDPOINT =
  process.env.NODE_ENV === 'development' ? '/.netlify/functions' : '/api'

exports.TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
exports.TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET

exports.SUPERSECRETTOKEN = process.env.SUPERSECRETTOKEN || 'SUPERSECRET'
