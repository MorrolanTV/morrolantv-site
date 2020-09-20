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
              <div class="sort-options">
                <client-only>
                  <button
                    v-if="$auth.loggedIn"
                    class="button is-primary save"
                    :class="{ saving: saving }"
                    @click="saveNodes()"
                  >
                    {{ saving ? 'Saving..' : 'Save' }}
                  </button>
                </client-only>
                <button class="button is-primary" @click="updateList()">
                  Re-Sort
                </button>
              </div>
            </div>
            <div class="nodecalc-list columns">
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
                  :image="node.image"
                  :materials="node.Materials"
                  :region="node.region"
                  :workload="node.workload"
                  :preset-workspeed="node.workspeed"
                  :preset-movespeed="node.movespeed"
                  :distance="node.distance"
                  :average-yield="node.averageYield"
                  @recalculated="updateListAuto"
                />
              </div>
            </div>
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
      autoUpdate: false,
      initialFilter: 'profit',
      filterMethod: 'profit',
      selectedRegion: '',
      saving: false,
      regions: [
        'balenos',
        'calpheon',
        'drieghan',
        'kamasylvia',
        'mediah',
        'serendia',
        'valencia',
      ],
    }
  },
  computed: {
    timeUpdated() {
      if (this.nodes && this.nodes.length > 0 && this.nodes[0].Materials[0]) {
        const [date, time] = this.nodes[0].Materials[0].updatedAt.split('T')
        return `Last Upated at ${date} ${time}`
      } else {
        return ''
      }
    },
    nodes() {
      if (this.nodesCalculated) {
        switch (this.filterMethod) {
          case 'profit':
            return this.getNodesByProfit
          case 'region':
            return this.getNodesByRegion(this.selectedRegion)
          default:
            return this.getNodesByProfit
        }
      } else {
        return this.getNodesUnsorted
      }
    },
    ...mapGetters(['getNodesByProfit', 'getNodesByRegion', 'getNodesUnsorted']),
    ...mapState([
      'workers',
      'nodesCalculated',
      'profitsUpdated',
      'nodeUserListLoaded',
      'updatedNodes',
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
  methods: {
    loginNodes() {
      this.$auth.loginWith('auth0')
    },
    updateList() {
      this.$store.commit('PROFITS_UPDATED')
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
        this.filterMethod = this.initialFilter
      } else {
        this.selectedRegion = region
        this.filterMethod = 'region'
      }
    },
    async saveNodes() {
      this.saving = true
      await this.$axios
        .$post('/user/userNodes', {
          nodes: JSON.stringify([...this.updatedNodes]),
          headers: {
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        .then(() => (this.saving = false))
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
}
.nodecalc-list {
  flex-wrap: wrap;
}
.filter-list {
  display: flex;
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
button.save {
  transition: 0.2s;
  &.saving {
    background: $yellow;
  }
}
.region-filter {
  cursor: pointer;
}
</style>
