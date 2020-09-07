const axios = require('axios')

const { TWITCH_CLIENT_ID } = require('./config')

const helixInstance = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: { 'Client-ID': TWITCH_CLIENT_ID },
})

module.exports = {
  setToken(token) {
    helixInstance.defaults.headers.common.Authorization = 'Bearer ' + token
  },
  helix: {
    getStreams(payload) {
      return helixInstance.get('/streams/', payload).then((x) => x.data)
    },
  },
}
