// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/
const cookieParser = require('cookie-parser')
const express = require('express')
const serverless = require('serverless-http')

const { ENDPOINT } = require('./utils/config')
const hasAuthToken = require('./utils/authToken')

const { helix } = require('./utils/helix')

const app = express()
app.use(cookieParser())
app.get(`${ENDPOINT}/streams`, hasAuthToken, async (req, res) => {
  try {
    const streams = await helix
      .getStreams({ user_id: '77473677' })
      .then((x) => x)
    res.json(streams)
  } catch (e) {
    throw new Error(e)
  }
})

app.use(function (err, req, res, next) {
  res.status(400).send(err.message)
})

module.exports.handler = serverless(app)
