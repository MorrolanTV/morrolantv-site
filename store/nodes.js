export const state = () => ({
  nodesError: '',
  nodesCalculated: false, // To notify parent when ready to sort by profit
  nodeGroupsCalculated: false,
  nodeUserListLoaded: false, // If user node list loaded, switch to default after logout
  nodes: new Map(), // Just that
  profitList: new Map(), // Sort Map for sort functions, hold id and profit
  takenNodes: new Set(), // Hold cp and profit from taken nodes, by id
  takenCp: 0,
  takenProfit: 0,
  activeHours: 16,
  groupGotUpdate: [],
  groupGotDeleted: [],
  groupsToCalculate: [],
  mountedNodesAmount: 0,
  groupsRecalculated: 0,
  nodesRecalculated: 0, // Can be set to 0 to recalculate all nodes, once equal to node size sync profits
  linkingActive: false,
  unlinkingActive: false,
  takingActive: false,
  tempLinkGroup: [],
  tempLinkGroupId: 0,
  linkLatestID: 0,
  nodesAutosort: true,
  profitsUpdated: 1, // Used to trigger reactivity for maps
  groupStatsUpdated: 1, // Refresher for all node components after cp has changed
  groupProfitsUpdated: 1, // Refresher for sortlist
  groupDeleteUpdated: 1, // Refresher for component to delete self group
  customNodesUpdated: 1, // Refresher for changedNodesMap
  disabledItems: new Set([752023]),
  overrideFloodedItems: new Set(),
  disabledItemsUpdated: 1,
  saveState: true,
  editMode: 'basic',
  workers: [
    {
      id: 0,
      name: 'Professional Giant',
      lodgingRestricted: ['Odraxxia', 'Grana', 'Old Wisdom Tree'],
      lodgingAlternative: [],
      work: 60,
      movement: 2.5,
      stamina: 25,
      luck: 11,
    },
    {
      id: 1,
      name: 'Professional Human',
      lodgingRestricted: ['Grana', 'Old Wisdom Tree'],
      lodgingAlternative: [],
      work: 85,
      movement: 3.5,
      stamina: 13,
      luck: 22,
    },
    {
      id: 2,
      name: 'Professional Goblin',
      lodgingRestricted: ['Grana', 'Old Wisdom Tree'],
      alternativeName: 'Professional Dwarf',
      lodgingAlternative: ['Odraxxia'],
      work: 135,
      movement: 6,
      stamina: 10,
      luck: 11,
    },
    {
      id: 3,
      name: 'Artisan Giant',
      lodgingRestricted: ['Odraxxia', 'Grana', 'Old Wisdom Tree'],
      lodgingAlternative: [],
      work: 85,
      movement: 3.5,
      stamina: 35,
      luck: 11,
    },
    {
      id: 4,
      name: 'Artisan Human',
      lodgingRestricted: ['Grana', 'Old Wisdom Tree'],
      lodgingAlternative: [],
      work: 100,
      movement: 4.5,
      stamina: 23,
      luck: 22,
    },
    {
      id: 5,
      name: 'Artisan Goblin',
      alternativeName: 'Artisan Dwarf',
      lodgingAlternative: ['Odraxxia'],
      lodgingRestricted: ['Grana', 'Old Wisdom Tree'],
      work: 140,
      movement: 7,
      stamina: 15,
      luck: 11,
    },
    {
      id: 6,
      name: '150 Goblin',
      alternativeName: '150 Dwarf',
      lodgingAlternative: ['Odraxxia'],
      lodgingRestricted: ['Grana', 'Old Wisdom Tree'],
      work: 150,
      movement: 7,
      stamina: 15,
      luck: 11,
    },
    {
      id: 7,
      name: 'Artisan Papu',
      lodgingRestricted: [
        'Arehaza',
        'Velia',
        'Odraxxia',
        'Trent',
        'Duvencrune',
        'Valencia',
        'Keplan',
        'Ancado',
        'Heidel',
        'Iliya',
        'Shakatu',
        'Olvia',
        'Epheria',
        'Altinova',
        'Tarif',
        'Bazaar',
        'Calpheon',
        'Glish',
      ],
      lodgingAlternative: [],
      work: 150,
      movement: 7.4,
      stamina: 17,
      luck: 9,
    },
    {
      id: 8,
      name: 'Artisan Fadus',
      lodgingRestricted: [
        'Arehaza',
        'Velia',
        'Odraxxia',
        'Trent',
        'Duvencrune',
        'Valencia',
        'Keplan',
        'Ancado',
        'Heidel',
        'Iliya',
        'Shakatu',
        'Olvia',
        'Epheria',
        'Altinova',
        'Tarif',
        'Bazaar',
        'Calpheon',
        'Glish',
      ],
      lodgingAlternative: [],
      work: 100,
      movement: 4.0,
      stamina: 40,
      luck: 11,
    },
  ],
})

export const mutations = {
  /*
   * Initially convert nodes from API to map and store
   */
  SET_NODES: (state, payload) => {
    payload.forEach((n) => {
      state.nodes.set(n.id, n)
      if (n.taken) state.takenNodes.add(n.id)
    })
  },
  SET_MATERIAL_PREFERENCES: (state, payload) => {
    state.disabledItems = new Set(payload)
  },
  SET_MATERIAL_OVERRIDES: (state, payload) => {
    state.overrideFloodedItems = new Set(payload)
  },
  /*
   * If usernodes got saved in localstorage and restored, override node for given
   */
  RESTORE_USERNODES: (state, payload) => {
    payload.forEach((element) => {
      state.nodes.set(element.id, element)
    })
  },
  /*
   * Set amount of mounted nodes, used to check calculate amount
   */
  SET_MOUNTED_NODES_COUNT: (state, payload) => {
    state.mountedNodesAmount = payload
  },
  /*
   * Set calculated profit in sortList. Calculate group profit
   */
  SET_NODE_PROFIT: (state, { id, data }) => {
    state.profitList.set(id, data)
    state.nodesCalculated = state.profitList.size === state.nodes.size
    if (state.takenNodes.has(id)) recalculateTaken(state)

    if (state.nodesCalculated) {
      state.nodesRecalculated += 1
      if (state.nodesRecalculated >= state.mountedNodesAmount) {
        if (state.nodesAutosort) state.profitsUpdated += 1
        syncProfit(state)
        state.nodesRecalculated = 0
      }
    }
    // Perform initial summ up of all groups
    if (state.nodesCalculated && !state.nodeGroupsCalculated) {
      state.nodesAutosort = false
      syncProfit(state)
      state.nodeGroupsCalculated = true
    }
  },
  /*
   * Is triggered after node component recalculated and has group
   * Will recalculate the profit for all nodes in stage and sync back to components
   */
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
  /*
   * Is triggered after node component model has changed
   * Will update node object in store, resync cp for groups
   */
  UPDATE_NODE(state, { id, data }) {
    const node = state.nodes.get(id)
    node.taken = data.taken
    node.cpAdd = data.cp
    node.workspeed = data.workspeed
    node.movespeed = data.movespeed
    node.luck = data.luck
    node.lodging = data.lodging
    node.changed = true
    state.saveState = false
    state.customNodesUpdated += 1
    updateTaken(state, id)
    if (data.updateLinks) {
      // Update cp acress all groups
      // Find all groups of updated node
      state.groupGotUpdate = [id, ...data.group.links]
      state.groupsToCalculate = data.group.links
      state.nodes.get(id).groupCP = data.groupCP
      syncCP(state, data.group.links)
      state.groupStatsUpdated += 1
    }
  },
  HANDLE_LINKING(state, status) {
    state.linkingActive = status
    if (status) {
      // Start linking
      state.unlinkingActive = false // stop unlinking
      state.tempLinkGroupId = state.linkLatestID + 1 // increase group color id
    }
    // If stop linking, form groups
    if (!status) formGroups(state)
  },
  HANDLE_UNLINKING(state, status) {
    state.unlinkingActive = status
    if (status) state.linkingActive = false
  },
  HANDLE_TAKING(state, status) {
    if (!state.linkingActive && !state.unlinkingActive) {
      state.takingActive = status
    }
  },
  ADD_LINK(state, id) {
    const targNode = state.nodes.get(id)
    if (!targNode.group) {
      // 1. Check if clicked node already has group
      if (!state.tempLinkGroup.includes(id)) {
        // 1.a If node has no group but is already in tempGroup, remove
        state.tempLinkGroup.push(id)
      } else {
        // 1.b If node has no group but is already in tempGroup, remove
        state.tempLinkGroup = state.tempLinkGroup.filter((x) => x !== id)
      }
    } else {
      // 3 clicked node has group and was not merged, combine groups
      state.tempLinkGroupId = JSON.parse(targNode.group).id // combining groups does not need new one
      const mergeGroup = new Set(
        state.tempLinkGroup.concat(JSON.parse(targNode.group).links)
      )
      mergeGroup.add(id)
      state.tempLinkGroup = Array.from(mergeGroup.values())
    }
  },
  UNLINK(state, id) {
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

      syncCP(state, state.groupGotUpdate)

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
  /*
   * Is triggered after node component model has changed
   * Will update node object in store, resync cp for groups
   */
  PROFITS_UPDATED: (state) => {
    state.profitsUpdated += 1
  },
  TOGGLE_MATERIAL: (state, id) => {
    if (state.disabledItems.has(id)) {
      state.disabledItems.delete(id)
    } else {
      state.disabledItems.add(id)
    }
    state.nodesRecalculated = 0 // Prepeare for complete recalc
    state.disabledItemsUpdated += 1
  },
  TOGGLE_FLOODED: (state, id) => {
    if (state.overrideFloodedItems.has(id)) {
      state.overrideFloodedItems.delete(id)
    } else {
      state.overrideFloodedItems.add(id)
    }
    state.nodesRecalculated = 0 // Prepeare for complete recalc
    state.disabledItemsUpdated += 1
  },
  SET_ACTIVE_HOURS: (state, hr) => {
    state.activeHours = hr
  },
  SET_EDIT_MODE: (state, payload) => {
    state.editMode = payload
  },
  SET_SAVESTATE: (state, payload) => {
    state.saveState = payload
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
}

function formGroups(state) {
  if (state.tempLinkGroup.length <= 1) {
    state.tempLinkGroup = []
    state.tempLinkGroupId = state.linkLatestID
    return
  }
  // Combine cp for all nodes in linked group
  for (const id of state.tempLinkGroup) {
    let profCP = 0
    // Set 'changed' on all nodes in group
    state.nodes.get(id).changed = true
    // Remove node id from list to prevent self including in group
    const links = state.tempLinkGroup.filter((x) => x !== id)
    const linkgroup = { id: state.tempLinkGroupId, links }
    state.nodes.get(id).group = JSON.stringify(linkgroup)

    for (const gid of links) {
      profCP += state.nodes.get(gid).contribution
      profCP += state.nodes.get(gid).cpAdd
    }
    state.nodes.get(id).groupCP = profCP
  }
  state.groupsRecalculated = 0
  state.groupGotUpdate = state.tempLinkGroup
  state.groupsToCalculate = state.tempLinkGroup
  state.tempLinkGroup = []
  state.linkLatestID = state.tempLinkGroupId
  state.groupStatsUpdated += 1
  state.customNodesUpdated += 1
}

function syncProfit(state) {
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
  state.groupProfitsUpdated += 1
}

function syncCP(state, grpElementIdList) {
  // Reset store cpGroup
  for (const gid of grpElementIdList) {
    let cpGrp = 0
    const linknode = state.nodes.get(gid)
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
}

function recalculateTaken(state) {
  let c = 0
  let p = 0
  state.takenNodes.forEach((x) => {
    c += state.profitList.get(x).cp
    p += state.profitList.get(x).profit
  })
  state.takenCp = c
  state.takenProfit = p
}

function updateTaken(state, id) {
  if (state.takenNodes.has(id)) {
    state.takenCp -= state.profitList.get(id).cp
    state.takenProfit -= state.profitList.get(id).profit
    state.takenNodes.delete(id)
  } else {
    state.takenNodes.add(id)
    state.takenCp += state.profitList.get(id).cp
    state.takenProfit += state.profitList.get(id).profit
  }
}
