<template>
  <main>
    <section class="hero subpage w-100">
      <div class="image-wrapper">
        <picture>
          <source
            :srcset="require(`~/assets/img/webp/${heroimg}.webp`)"
            type="image/webp"
          />
          <source
            :srcset="require(`~/assets/img/webp/${heroimg}.jpg`)"
            type="image/jpeg"
          />
          <img
            class="image"
            :src="require(`~/assets/img/webp/${heroimg}.jpg`)"
            alt="Alt Text!"
          />
        </picture>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Worker Empire Tool</h1>
        <div class="node-calculator">
          <div v-if="$fetchState.pending" class="loader"></div>
          <div v-else-if="$fetchState.error" class="error-wrapper">
            <div class="error">
              <h3 class="title">API ERROR</h3>
              <h5 class="subtitle">COULD NOT FETCH DATA</h5>
              <p>Our API is having trouble at the moment, check back later.</p>
            </div>
          </div>
          <div v-else>
            <div class="nodecalc-header">
              <h3 class="title is-4">Guide</h3>
              <p class="mb-3">
                This tool provides a general comparison of node profitability.
                Many factors influence your net gain, and these numbers serve as
                an estimate to help you find the better nodes quicker.
              </p>
              <p class="mb-2">
                <strong class="has-text-info"
                  >To get numbers more precise to your situation, you can click
                  the node and change the following values:</strong
                >
              </p>
              <ul>
                <li class="mb-1">
                  <strong>Worker:</strong> The tool will automatically select
                  the cheapest worker while maintaining max profit. Switch here
                  if you don't have said worker available.
                </li>
                <li class="mb-1">
                  <strong>CP Used:</strong> Currently the tool does not
                  automatically take the CP cost of previous nodes you have to
                  get into account. Adjust this value depending on how many
                  nodes in the path you chose.
                </li>
                <li class="mb-1">
                  <strong>Workspeed:</strong> Fine tune your workers workspeed
                  with this value.
                </li>
                <li class="mb-1">
                  <strong>Movespeed:</strong> Fine tune your workers movespeed
                  with this value.
                </li>
              </ul>
              <client-only>
                <p v-if="!$auth.loggedIn" class="mt-3" @click="loginNodes()">
                  <a class="link-light">Login</a> to save your edits.
                </p>
              </client-only>
            </div>
            <div class="is-flex justify-between">
              <h5 class="mb-3">
                Use the region icons to filter nodes. Nodes are sorted by
                profit/cp
              </h5>
              <h5 class="mb-3">
                {{ timeUpdated }}
              </h5>
            </div>
            <div
              class="nodecalc-filter-wrapper is-flex align-center justify-between mb-3"
            >
              <div
                class="filter-list"
                :class="selectedRegion != '' ? 'hasSelected' : ''"
              >
                <div
                  v-for="region in regions"
                  :key="region"
                  class="region-filter"
                  :class="region == selectedRegion ? 'on' : 'off'"
                  @click="selectRegion(region)"
                >
                  <img :src="generateRegionImage(region)" class="region-img" />
                </div>
              </div>
              <div class="sort-options is-flex align-center">
                <div class="buttons has-addons mb-0 mr-2">
                  <button
                    class="button mb-0"
                    :class="
                      playerRegion === 'NA' ? 'is-selected is-warning' : ''
                    "
                    @click="setMarketRegion('NA')"
                  >
                    NA
                  </button>
                  <button
                    class="button mb-0"
                    :class="
                      playerRegion === 'EU' ? 'is-selected is-warning' : ''
                    "
                    @click="setMarketRegion('EU')"
                  >
                    EU
                  </button>
                </div>
                <h4 v-if="linkingActive" class="is-6 mr-3">
                  <span v-if="!linkOrigin">Select ungrouped node</span>
                  <span v-if="linkOrigin && !linkTarget"
                    >Select second node</span
                  >
                  <span></span>
                </h4>
                <button
                  v-if="!nodesError"
                  class="button is-primary functional mr-2"
                  :class="{ enabled: linkingActive }"
                  @click="handleLinking()"
                >
                  {{ linkingActive ? 'Stop' : 'Add links' }}
                </button>
                <button
                  v-else
                  class="button is-primary functional mr-2"
                  :data-tooltip="nodesError"
                  :class="{ enabled: linkingActive }"
                  @click="handleLinking()"
                >
                  {{ linkingActive ? 'Stop' : 'Add links' }}
                </button>
                <button
                  class="button is-primary functional mr-2"
                  data-tooltip="Unlink - Click either one of a group node"
                  :class="{ enabled: unlinkingActive }"
                  @click="handleUnlink()"
                >
                  {{ unlinkingActive ? 'Abort' : 'Unlink' }}
                </button>
                <button class="button is-primary" @click="updateList()">
                  Re-Sort
                </button>
                <client-only>
                  <button
                    v-if="$auth.loggedIn"
                    class="button is-primary save functional"
                    :class="{ enabled: saving }"
                    @click="saveNodes()"
                  >
                    {{ saving ? 'Saving..' : 'Save' }}
                  </button>
                </client-only>
              </div>
            </div>
            <div v-show="nodeGroupsCalculated" class="nodecalc-list columns">
              <div
                v-for="node in nodes"
                :key="node.id"
                class="node-wrapper column is-one-third"
              >
                <Node
                  v-if="node.Materials[0]"
                  :id="node.id"
                  :name="node.name"
                  :contribution="node.contribution"
                  :cp-add="node.cpAdd"
                  :image="node.image"
                  :materials="node.Materials"
                  :region="node.region"
                  :workload="node.workload"
                  :preset-workspeed="node.workspeed"
                  :preset-movespeed="node.movespeed"
                  :distances="JSON.parse(node.distances)"
                  :lodging="node.lodging"
                  :group="JSON.parse(node.group)"
                  :group-cp="node.groupCP ? node.groupCP : null"
                  :group-profit="node.groupProfit ? node.groupProfit : null"
                  @recalculated="updateListAuto"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal" :class="error ? 'is-active' : ''">
          <div class="modal-background"></div>
          <div class="modal-content">
            <h4 class="title is-4">Error</h4>
            <h5 class="subtitle is-5">{{ errorMessage }}</h5>
            <button
              class="button is-primary"
              aria-label="close"
              @click="reloadPage()"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  async fetch() {
    if (this.$auth.loggedIn) {
      const nodes = await this.$axios
        .$get('/user/userNodes', {
          headers: {
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        .then((res) => res)
      if (nodes) {
        this.$store.commit('SET_NODES', nodes)
      }
    } else {
      // Fetch default node data
      const nodes = await this.$axios.$get('/nodes').then((res) => res)
      if (nodes) {
        this.$store.commit('SET_NODES', nodes)
      }
    }
  },
  data() {
    return {
      heroimg: 'world',
      error: null,
      errorMessage: '',
      autoUpdate: false,
      saving: false,
      linking: false,
      selectedRegion: '',
      regions: [
        'balenos',
        'calpheon',
        'drieghan',
        'kamasylvia',
        'mediah',
        'serendia',
        'valencia',
        'margoria',
      ],
    }
  },
  computed: {
    timeUpdated() {
      if (this.nodes && this.nodes.length > 0 && this.nodes[0].Materials[0]) {
        const [date, time] = this.nodes[0].Materials[0].updatedAt.split('T')
        return `Last Updated at ${date} ${time}`
      } else {
        return ''
      }
    },
    nodes() {
      if (this.nodeGroupsCalculated) {
        let nodes = this.getNodesByProfit
        if (this.selectedRegion)
          nodes = nodes.filter(
            (node) => node.region.toLowerCase() === this.selectedRegion
          )
        return nodes
      } else return this.getNodesUnsorted
    },
    ...mapGetters(['getNodesByProfit', 'getNodesUnsorted', 'getChangedNodes']),
    ...mapState([
      'playerRegion',
      'workers',
      'nodesError',
      'nodesCalculated',
      'nodeGroupsCalculated',
      'profitsUpdated',
      'nodeUserListLoaded',
      'linkingActive',
      'unlinkingActive',
      'linkOrigin',
      'linkTarget',
    ]),
  },
  /* activated() {
    // Prevent  wrong nodelist in keep-alive after login state change
    if (!this.$auth.loggedIn && this.nodeUserListLoaded) {
      this.$store.commit('SET_DEFAULT_NODELIST')
      this.$fetch()
    } else if (this.$auth.loggedIn && !this.nodeUserListLoaded) {
      this.$store.commit('SET_USER_NODELIST')
      this.$fetch()
    }
  }, */
  fetchOnServer: false,
  mounted() {
    if (localStorage.getItem('usernodes')) {
      this.restoreUsernodes()
    }
  },
  methods: {
    loginNodes() {
      this.$auth.loginWith('auth0')
    },
    updateList() {
      this.$store.commit('PROFITS_UPDATED')
    },
    setMarketRegion(r) {
      this.$store.commit('SET_MARKET_REGION', r)
    },
    updateListAuto() {
      if (this.autoUpdate) {
        this.$store.commit('PROFITS_UPDATED')
      }
    },
    generateRegionImage(region) {
      return require(`~/assets/img/tools/general/REGION_${region}.png`)
    },
    selectRegion(region) {
      if (region === this.selectedRegion) {
        this.selectedRegion = ''
      } else {
        this.selectedRegion = region
      }
    },
    handleLinking() {
      this.$store.commit('TOGGLE_LINKING', !this.linkingActive)
    },
    handleUnlink() {
      this.$store.commit('TOGGLE_UNLINKING', !this.unlinkingActive)
    },
    async saveNodes() {
      this.saving = true
      await this.$axios
        .$post('/user/userNodes', {
          nodes: JSON.stringify([...this.getChangedNodes]),
          headers: {
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        .then(() => {
          if (this.hasBackup) localStorage.removeItem('usernodes')
          this.saving = false
        })
        .catch(() => {
          this.saving = false
          this.persistUsernodes()
          this.errorMessage =
            'Could not save nodes. Press OK to reload the page.'
          this.error = true
        })
    },
    persistUsernodes() {
      localStorage.setItem(
        'usernodes',
        JSON.stringify([...this.getChangedNodes])
      )
    },
    restoreUsernodes() {
      try {
        const nodes = new Map(JSON.parse(localStorage.getItem('usernodes')))
        this.$store.commit('RESTORE_USERNODES', nodes)
      } catch (e) {
        localStorage.removeItem('usernodes')
      }
      localStorage.removeItem('usernodes')
    },
    reloadPage() {
      window.location.reload()
    },
  },
}
</script>
<style lang="scss" scoped>
.nodecalc-header {
  margin-bottom: 50px;
}
.nodecalc-filter-wrapper {
  position: sticky;
  top: 77px;
  background: $background-primary;
  z-index: 2;
  padding-top: 15px;
}
.nodecalc-list {
  flex-wrap: wrap;
}
.filter-list {
  display: flex;
  flex-wrap: wrap;
  img {
    height: 70px;
  }
  &.hasSelected {
    .region-filter.off {
      img {
        filter: grayscale(100%);
      }
    }
  }
}
.region-filter {
  cursor: pointer;
}
</style>
<style lang="scss">
$nodelinks-colors: white, $blue, $red, $yellow, $purple, #57889b, #a14a64,
  #c5be59, #a31a5f #4fce99, #5081af, #b93daf, #e0925d, #2d9299 #9b3535;
.node-wrapper.grouped {
  border: 2px solid;
  @for $i from 1 through length($nodelinks-colors) {
    &.group-#{$i} {
      border-color: nth($nodelinks-colors, $i);
    }
  }
}
</style>
