export const state = () => ({
  isStreamLive: false, // Just that
  playerRegion: 'NA', // Used to determine region for calc
  redirectUrl: '', // If string is set, redirect to there after login, then reset
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
        'To achieve the highest profit, creating and selling your crates in the correct location is important.',
      image: 'crate',
      path: '/',
    },
    {
      name: 'Horse Breeding',
      gname: 'Black Desert Online',
      desc: 'Coming soon',
      long: 'Find out how expensive your new horse is going to be',
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
  nodesCalculated: false, // To notify parent when ready to sort by profit
  nodeUserListLoaded: false, // If user node list loaded, switch to default after logout
  nodes: [], // Just that
  updatedNodes: new Map(), // Marked nodes (id, cp, ws, ms) to save back to user storage
  profitList: new Map(), // Sort Map for sort functions, hold id and profit
  profitsUpdated: 1, // Used to trigger reactivity for maps
  selectedRegion: '', // Used to filter nodes by region,
  workers: [
    {
      id: 0,
      name: 'Artisan Goblin',
      work: 150,
      movement: 7,
      stamina: 15,
      luck: 11,
    },
    {
      id: 1,
      name: 'Artisan Human',
      work: 100,
      movement: 4.5,
      stamina: 23,
      luck: 22,
    },
    {
      id: 2,
      name: 'Artisan Giant',
      work: 85,
      movement: 3.5,
      stamina: 35,
      luck: 11,
    },
    {
      id: 3,
      name: 'Professional Goblin',
      work: 135,
      movement: 6,
      stamina: 10,
      luck: 11,
    },
    {
      id: 4,
      name: 'Professional Human',
      work: 85,
      movement: 3.5,
      stamina: 13,
      luck: 22,
    },
    {
      id: 5,
      name: 'Professional Giant',
      work: 60,
      movement: 2.5,
      stamina: 25,
      luck: 11,
    },
  ],
  recipes: [],
  recipeList: new Map(),
})

export const mutations = {
  SET_STREAM_LIVE: (state, payload) => {
    state.isStreamLive = payload
  },
  SET_REDIRECT_URL: (state, payload) => {
    state.redirectUrl = payload
  },
  CLEAR_REDIRECT_URL: (state) => {
    state.redirectUrl = ''
  },
  SET_NODES: (state, payload) => {
    state.nodes = payload
  },
  RESTORE_USERNODES: (state, payload) => {
    state.updatedNodes = payload
  },
  SET_USER_NODELIST: (state) => {
    state.nodeUserListLoaded = true
  },
  SET_DEFAULT_NODELIST: (state) => {
    state.nodeUserListLoaded = false
  },
  SET_NODE_PROFIT: (state, payload) => {
    state.profitList.set(payload.id, payload.profit)
    state.nodesCalculated = state.profitList.size === state.nodes.length
  },
  PROFITS_UPDATED: (state) => {
    state.profitsUpdated += 1
  },
  MARK_NODE_UPDATED(state, { id, data }) {
    state.updatedNodes.set(id, data)
  },
  SET_REGION_FILTER: (state, payload) => {
    state.selectedRegion = payload
  },
  SET_RECIPE_TREE: (state, payload) => {
    state.recipes = payload
  },
  RECIPE_INITIALIZED(state, { id, data }) {
    state.recipeList.set(id, data)
  },
}

export const getters = {
  getNodesByProfit: (state) => {
    let nodes = [...state.nodes]
    if (state.selectedRegion) {
      nodes = nodes.filter(
        (node) => node.region.toLowerCase() === state.selectedRegion
      )
    }
    const sorted = nodes.sort(function (a, b) {
      return state.profitList.get(b.id) - state.profitList.get(a.id)
    })
    if (state.profitsUpdated > 0) {
      return sorted
    }
  },
  getNodesUnsorted: (state) => {
    return state.nodes
  },
  getRecipes: (state) => {
    return state.recipes
  },
  getRecipesByProfit: (state) => {
    return state.recipes
  },
  getRecipePractical: (state) => (recipeId) => {
    return state.recipeList.get(recipeId)
  },
}

export const actions = {}
