export const state = () => ({
  isStreamLive: false,
  nodes: [],
  profitOrder: [],
})

export const mutations = {
  SET_STREAM_LIVE: (state, payload) => {
    state.isStreamLive = payload
  },
  SET_NODES: (state, payload) => {
    state.nodes = payload
  },
}

export const getters = {
  getNodesByProfit: (state) => {
    state.profitOrder.map((id) => state.nodes[id])
  },
}
