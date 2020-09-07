const { ApiClient } = require('twitch')
const { ClientCredentialsAuthProvider } = require('twitch-auth')

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = require('./config')

const authProvider = new ClientCredentialsAuthProvider(
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET
)
const apiClient = new ApiClient({ authProvider })

async function isStreamLive(userName) {
  const user = await apiClient.helix.users.getUserByName(userName)
  if (!user) {
    return false
  }
  return (await user.getStream()) !== null
}

module.exports = {
  twitchClient: {
    isStreamLive,
  },
}
