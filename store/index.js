export const state = () => ({
  isStreamLive: false, // Just that
  nodesCalculated: false, // To notify parent when ready to sort by profit
  nodeUserListLoaded: false, // If user node list loaded, switch to default after logout
  nodes: [], // Just that
  updatedNodes: new Map(), // Marked nodes (id, cp, ws, ms) to save back to user storage
  profitList: new Map(), // Sort Map for sort functions, hold id and profit
  profitsUpdated: 1, // Used to trigger reactivity for maps
  playerRegion: 'NA', // Used to determine region for calc
  redirectUrl: '', // If string is set, redirect to there after login, then reset
  workers: [
    { id: 0, name: 'Artisan Goblin', work: 150, movement: 7, stamina: 15 },
    { id: 1, name: 'Artisan Human', work: 100, movement: 4.5, stamina: 23 },
    { id: 2, name: 'Artisan Giant', work: 85, movement: 3.5, stamina: 35 },
    { id: 3, name: 'Professional Goblin', work: 135, movement: 6, stamina: 10 },
    { id: 4, name: 'Professional Human', work: 85, movement: 3.5, stamina: 13 },
    { id: 5, name: 'Professional Giant', work: 60, movement: 2.5, stamina: 25 },
  ],
  tools: [
    {
      name: 'Cooking Calculator',
      gname: 'Black Desert Online',
      // WIP Learn what recepies are best to cook
      desc: 'Coming soon',
      long:
        'Cooking can be a great active lifeskill to gain both CP and silver at the same time. With this calculator you can quickly figure out what profits to expect from recepies.',
      image: 'cooking',
      path: '/',
    },
    {
      name: 'Crate Calculator',
      gname: 'Black Desert Online',
      desc: 'Coming soon',
      long:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'crate',
      path: '/',
    },
    {
      name: 'Horse Breeding',
      gname: 'Black Desert Online',
      desc: 'Coming soon',
      long:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'horse',
      path: '/',
    },
    {
      name: 'Worker Empire',
      gname: 'Black Desert Online',
      desc: 'Check out the most profitable nodes, simulate outcomes',
      long:
        'Node empires are what give players passive income. Use this tool to figure out the best setup for your workers and nodes. Compare workers and sort nodes by profit.',
      image: 'nodes',
      path: '/tools/nodes',
    },
  ],
})

export const mutations = {
  SET_STREAM_LIVE: (state, payload) => {
    state.isStreamLive = payload
  },
  SET_NODES: (state, payload) => {
    state.nodes = payload
  },
  SET_NODE_PROFIT: (state, payload) => {
    state.profitList.set(payload.id, payload.profit)
    state.nodesCalculated = state.profitList.size === state.nodes.length
  },
  PROFITS_UPDATED: (state) => {
    state.profitsUpdated += 1
  },
  SET_REDIRECT_URL: (state, payload) => {
    state.redirectUrl = payload
  },
  CLEAR_REDIRECT_URL: (state) => {
    state.redirectUrl = ''
  },
  SET_USER_NODELIST: (state) => {
    state.nodeUserListLoaded = true
  },
  SET_DEFAULT_NODELIST: (state) => {
    state.nodeUserListLoaded = false
  },
  MARK_NODE_UPDATED(state, { id, data }) {
    state.updatedNodes.set(id, data)
  },
}

export const getters = {
  getNodesByProfit: (state) => {
    const sorted = [...state.nodes].sort(function (a, b) {
      return state.profitList.get(b.id) - state.profitList.get(a.id)
    })
    if (state.profitsUpdated > 0) {
      return sorted
    }
  },
  getNodesByRegion: (state) => (region) => {
    const sorted = [...state.nodes].sort(function (a, b) {
      return state.profitList.get(b.id) - state.profitList.get(a.id)
    })
    return sorted.filter((node) => node.region.toLowerCase() === region)
  },
  getNodesUnsorted: (state) => {
    return state.nodes
  },
}
