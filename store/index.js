export const state = () => ({
  isStreamLive: false, // Just that
  playerRegion: 'NA', // Used to determine region for calc
  redirectUrl: '', // If string is set, redirect to there after login, then reset
  saveState: true,
  tools: [
    {
      name: 'Cooking Calculator',
      gname: 'Black Desert Online',
      // WIP Learn what recipes are best to cook
      desc: 'Coming soon',
      long:
        'Cooking can be a great active lifeskill to gain both CP and silver at the same time. With this calculator you can quickly figure out what profits to expect from recipes.',
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
      name: 'Processing Calculator',
      gname: 'Black Desert Online',
      desc: 'Coming soon',
      long: 'See what items are the most profitable to process.',
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
  SET_MARKET_REGION: (state, payload) => {
    state.nodesRecalculated = 0
    state.playerRegion = payload
  },
  /*
   * Keep track of some state and display 'unsaved' if false
   */
  SET_SAVESTATE: (state, payload) => {
    state.saveState = payload
  },
  SET_RECIPE_TREE: (state, payload) => {
    state.recipes = payload
  },
  RECIPE_INITIALIZED(state, { id, data }) {
    state.recipeList.set(id, data)
  },
}

export const getters = {
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
