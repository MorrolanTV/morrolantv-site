const express = require('express')
const serverless = require('serverless-http')
const { ENDPOINT } = require('./utils/config')
const { twitchClient } = require('./utils/twitchClient')

const app = express()

// Example, not useful
app.get(`${ENDPOINT}/live`, async (req, res) => {
  try {
    const isLive = await twitchClient.isStreamLive('morrolantv')
    res.json({ live: isLive })
  } catch (e) {
    throw new Error(e)
  }
})

app.use(function (err, req, res, next) {
  res.status(400).send(err.message)
})

module.exports.handler = serverless(app)
