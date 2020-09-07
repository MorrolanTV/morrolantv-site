export const state = () => ({
  isStreamLive: false,
})

export const mutations = {
  SET_STREAM_LIVE: (state, payload) => {
    state.isStreamLive = payload
  },
}
