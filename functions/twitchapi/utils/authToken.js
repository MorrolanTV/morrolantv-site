const { ClientCredentials } = require('simple-oauth2')

const { setToken } = require('./helix')

const {
  COOKIE_SECURE,
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
} = require('./config')

const clientConfig = {
  client: {
    id: TWITCH_CLIENT_ID,
    secret: TWITCH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://id.twitch.tv',
    tokenPath: 'https://id.twitch.tv/oauth2/token',
  },
  options: {
    authorizationMethod: 'body',
  },
}

const oauthclient = new ClientCredentials(clientConfig)

module.exports = async function hasAuthToken(req, res, next) {
  if (!req.cookies.twitchtoken) {
    try {
      const accessToken = await oauthclient.getToken()
      setToken(accessToken.token.access_token)
      const expire =
        accessToken.token.expires_in > 240000
          ? 240000
          : accessToken.token.expires_in
      res.cookie('twitchtoken', accessToken.token.access_token, {
        maxAge: expire,
        secure: COOKIE_SECURE,
        httpOnly: true,
      })
      next()
    } catch (e) {
      throw new Error(e) // Express will catch this on its own.
    }
  } else {
    next()
  }
}
