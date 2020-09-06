// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const serverless = require('serverless-http')
const { ClientCredentials } = require('simple-oauth2')

const {
  ENDPOINT,
  COOKIE_SECURE,
  SUPERSECRETTOKEN,
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
} = require('./utils/config')

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

const app = express()

app.use(cookieParser())
const sess = {
  secret: SUPERSECRETTOKEN,
  resave: false,
  saveUninitialized: true,
  cookie: {},
}

/* if (COOKIE_SECURE) {
  sess.cookie.secure = true // serve secure cookies
} */

app.use(session(sess))

app.get(`${ENDPOINT}/twitchapi`, async (req, res) => {
  console.log(req.session)
  if (req.session.token) {
    res.json({ token: req.session.token })
  } else {
    try {
      console.log('fetch new token')
      const token = await oauthclient.getToken()
      req.session.token = token
      req.session.save(function () {
        res.json(req.session)
      })
    } catch (e) {
      console.log(e)
      res.json({ error: 'Token fetch error' })
    }
  }
})

module.exports.handler = serverless(app)
