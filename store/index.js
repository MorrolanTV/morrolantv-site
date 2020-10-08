export const state = () => ({
  isStreamLive: false, // Just that
  playerRegion: 'NA', // Used to determine region for calc
  redirectUrl: '', // If string is set, redirect to there after login, then reset
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
  nodesError: '',
  nodesCalculated: false, // To notify parent when ready to sort by profit
  nodeGroupsCalculated: false,
  nodeUserListLoaded: false, // If user node list loaded, switch to default after logout
  nodes: new Map(), // Just that
  profitList: new Map(), // Sort Map for sort functions, hold id and profit
  profitsUpdated: 1, // Used to trigger reactivity for maps
  groupStatsUpdated: 1,
  saveState: true,
  groupProfitsUpdated: 1,
  groupDeleteUpdated: 1,
  customNodesUpdated: 1,
  groupGotUpdate: [],
  groupGotDeleted: [],
  groupsToCalculate: [],
  groupsRecalculated: 0,
  nodesRecalculated: 0,
  linkingActive: false,
  unlinkingActive: false,
  linkOrigin: null,
  linkTarget: null,
  linkLatestID: 0,
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
  SET_MARKET_REGION: (state, payload) => {
    state.nodesRecalculated = 0
    state.playerRegion = payload
  },
  SET_NODES: (state, payload) => {
    state.nodes = new Map(payload.map((node) => [node.id, node]))
  },
  RESTORE_USERNODES: (state, payload) => {
    state.updatedNodes = payload
  },
  SET_SAVESTATE: (state, payload) => {
    state.saveState = payload
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

    if (state.nodesCalculated) {
      state.nodesRecalculated += 1
      if (state.nodesRecalculated === state.nodes.size) {
        state.profitsUpdated += 1
        state.nodesRecalculated = 0
      }
    }
    // Perform initial summ up of all groups
    if (state.nodesCalculated && !state.nodeGroupsCalculated) {
      const groupNodes = Array.from([...state.nodes.values()]).filter(
        (x) => x.group
      )
      for (const node of groupNodes) {
        let profGrp = 0
        const g = JSON.parse(node.group)
        if (g.id > state.linkLatestID) state.linkLatestID = g.id
        for (const id of g.links) {
          profGrp += state.profitList.get(id).profit
        }
        state.nodes.get(node.id).groupProfit = profGrp
        const nodeProfit = state.profitList.get(node.id)
        nodeProfit.profitCP = (nodeProfit.profit + profGrp) / nodeProfit.cp
      }
      state.nodeGroupsCalculated = true
    }
  },
  GROUP_NODE_RECALCUATED: (state, payload) => {
    if (state.groupsToCalculate.includes(payload)) state.groupsRecalculated += 1
    if (
      state.groupsRecalculated === state.groupsToCalculate.length &&
      state.groupsToCalculate.length > 0
    ) {
      for (const linkID of state.groupsToCalculate) {
        let profGrp = 0
        for (const id of JSON.parse(state.nodes.get(linkID).group).links) {
          profGrp += state.profitList.get(id).profit
        }
        state.nodes.get(linkID).groupProfit = profGrp
        const nodeProfit = state.profitList.get(linkID)
        nodeProfit.profitCP = (nodeProfit.profit + profGrp) / nodeProfit.cp
      }
      state.groupsRecalculated = 0
      state.groupsToCalculate = []
      state.groupGotUpdate = []
      state.groupProfitsUpdated += 1
    }
  },
  UPDATE_NODE(state, { id, data }) {
    const node = state.nodes.get(id)
    node.cpAdd = data.cp
    node.workspeed = data.workspeed
    node.movespeed = data.movespeed
    node.lodging = data.lodging
    node.changed = true
    state.saveState = false
    state.customNodesUpdated += 1
    if (data.updateLinks) {
      // Update cp acress all groups
      // Find all groups of updated node
      state.groupGotUpdate = [id, ...data.group.links]
      state.groupsToCalculate = data.group.links
      state.nodes.get(id).groupCP = data.groupCP
      for (const lid of data.group.links) {
        let cpGrp = 0
        const linknode = state.nodes.get(lid)
        if (linknode.group) {
          // For all iter groups, gather all cp from iter group
          for (const linkID of JSON.parse(linknode.group).links) {
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
  PROFITS_UPDATED: (state) => {
    state.profitsUpdated += 1
  },
  CUSTOM_UPDATED: (state) => {
    state.customNodesUpdated += 1
  },
  TOGGLE_LINKING(state, status) {
    state.linkingActive = status
    state.linkOrigin = null
    state.linkTarget = null
    if (status) state.unlinkingActive = false
  },
  TOGGLE_UNLINKING(state, status) {
    state.unlinkingActive = status
    state.linkOrigin = null
    state.linkTarget = null
    if (status) state.linkingActive = false
  },
  NODE_LINK(state, id) {
    if (!state.linkOrigin) state.linkOrigin = id
    else if (!state.linkTarget) state.linkTarget = id
    if (state.linkOrigin && state.linkTarget) {
      const origNode = state.nodes.get(state.linkOrigin)
      const targNode = state.nodes.get(state.linkTarget)
      targNode.changed = true
      origNode.changed = true
      if (!origNode.group) {
        if (!targNode.group) state.linkLatestID += 1
        // Build groups
        const origGrp = targNode.group
          ? JSON.parse(targNode.group)
          : { id: state.linkLatestID, links: [] }
        const trgGroup = targNode.group
          ? JSON.parse(targNode.group)
          : { id: state.linkLatestID, links: [] }
        origGrp.links = [state.linkTarget, ...origGrp.links]
        trgGroup.links = [state.linkOrigin, ...trgGroup.links]

        // Get full list of nodes to recalculate groups for
        const combined = [state.linkTarget, ...trgGroup.links]

        // Set group in node map
        origNode.group = JSON.stringify(origGrp)
        targNode.group = JSON.stringify(trgGroup)

        // Combine cp for all nodes in linked group
        for (const lid of combined) {
          let profCP = 0
          const linkgroup = JSON.parse(state.nodes.get(lid).group)

          if (lid !== state.linkOrigin && linkgroup.links) {
            // Set newly selected origin node id in all non clicked but in group nodes
            if (!linkgroup.links.includes(state.linkOrigin)) {
              linkgroup.links = [state.linkOrigin, ...linkgroup.links]
            }
            state.nodes.get(lid).group = JSON.stringify(linkgroup)
          }

          for (const gid of linkgroup.links) {
            // New group will contain node itself. Dont add these stats to groupCP
            profCP += gid !== lid ? state.nodes.get(gid).contribution : 0
            profCP += gid !== lid ? state.nodes.get(gid).cpAdd : 0
          }
          state.nodes.get(lid).groupCP = profCP
        }
        state.groupsRecalculated = 0
        state.groupGotUpdate = combined
        state.groupsToCalculate = combined
        state.groupStatsUpdated += 1
        state.customNodesUpdated += 1
      } else {
        state.nodesError = 'Press first on unlinked nodes'
        state.linkingActive = false
      }
      state.linkOrigin = null
      state.linkTarget = null
    }
  },
  NODE_UNLINK(state, id) {
    if (state.nodes.get(id).group) {
      const group = JSON.parse(state.nodes.get(id).group)
      // Remove id from all linked groups
      for (const lid of group.links) {
        const linkgroup = JSON.parse(state.nodes.get(lid).group)
        const newLinks = linkgroup.links.filter((x) => x !== id)
        if (newLinks.length > 0) {
          linkgroup.links = newLinks
          state.nodes.get(lid).group = JSON.stringify(linkgroup)
          state.groupGotUpdate = [lid, ...state.groupGotUpdate]
          state.groupsToCalculate = [lid, ...state.groupsToCalculate]
        } else {
          // Remove complete group
          state.nodes.get(lid).group = null
          state.nodes.get(lid).changed = true
          state.groupGotDeleted = [lid, ...state.groupGotDeleted]
        }
      }
      // Remove group from clicked node
      state.nodes.get(id).group = null
      state.nodes.get(id).changed = true
      state.groupGotDeleted = [id, ...state.groupGotDeleted]

      state.groupsRecalculated = 0
      state.groupStatsUpdated += 1
      state.groupDeleteUpdated += 1
      state.customNodesUpdated += 1
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
    if (state.profitsUpdated > 0 && state.nodeGroupsCalculated) {
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
    const n = Array.from([...state.nodes.values()]).filter((x) => x.changed)
    if (state.customNodesUpdated > 0) return n
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
