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
  nodeGroupsCalculated: false,
  nodeUserListLoaded: false, // If user node list loaded, switch to default after logout
  nodes: new Map(), // Just that
  profitList: new Map(), // Sort Map for sort functions, hold id and profit
  profitsUpdated: 1, // Used to trigger reactivity for maps
  groupStatsUpdated: 1,
  groupProfitsUpdated: 1,
  groupsCalculated: 1,
  linkingActive: false,
  linkOrigin: null,
  linkTarget: null,
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
    state.nodes = new Map(payload.map((node) => [node.id, node]))
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
  SET_NODE_PROFIT: (state, { id, data }) => {
    state.profitList.set(id, data)
    state.nodesCalculated = state.profitList.size === state.nodes.size
  },
  LINK_CALCULATED: (state, { id, data }) => {
    state.nodes.get(id).groupProfit = data.profitGroup
    state.groupsCalculated += 1
    state.nodeGroupsCalculated = state.groupsCalculated >= state.nodes.size
    if (state.nodeGroupsCalculated) {
      state.groupProfitsUpdated += 1
      state.profitsUpdated += 1
    }
  },
  PROFITS_UPDATED: (state) => {
    state.profitsUpdated += 1
  },
  UPDATE_NODE(state, { id, data }) {
    const node = state.nodes.get(id)
    node.cpAdd = data.cp
    node.workspeed = data.workspeed
    node.movespeed = data.movespeed
    node.lodging = data.lodging
    node.changed = true
    if (data.updateLinks) {
      // Update cp acress all groups
      // Find all groups of updated node
      for (const id of data.group.links) {
        let cpGrp = 0
        const linknode = state.nodes.get(id)
        if (linknode.group) {
          // For all iter groups, gather all cp from iter group
          for (const linkID of linknode.group.links) {
            const node = state.nodes.get(linkID)
            cpGrp += node.contribution
            cpGrp += node.cpAdd
          }
          linknode.groupCP = cpGrp
        }
      }
      state.groupStatsUpdated += 1
    }
  },
  TOGGLE_LINKING(state, status) {
    state.linkingActive = status
  },
  NODE_LINK(state, id) {
    if (!state.linkOrigin) state.linkOrigin = id
    else if (!state.linkTarget) state.linkTarget = id
    if (state.linkOrigin && state.linkTarget) {
      // const origInfo = state.updatedNodes.get(state.linkOrigin)
      // const targInfo = state.updatedNodes.get(state.linkTarget)

      state.linkOrigin = null
      state.linkTarget = null
    }
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
    const sorted = Array.from([...state.nodes.values()]).sort(function (a, b) {
      return (
        state.profitList.get(b.id).profitCP -
        state.profitList.get(a.id).profitCP
      )
    })
    if (state.profitsUpdated > 0) {
      return sorted
    }
  },
  getNodesUnsorted: (state) => {
    const n = Array.from([...state.nodes.values()])
    if (state.profitsUpdated > 0) {
      return n
    }
  },
  getChangedNodes: (state) => {
    return Array.from([...state.nodes.values()]).filter((x) => x.changed)
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
