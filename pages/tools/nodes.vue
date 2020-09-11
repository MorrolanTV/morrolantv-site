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
              <h3 class="title is-4">Explanation</h3>
              <p>
                Maybe place a section explaining how to use the calculator for
                new players? Video maybe?
              </p>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
            <div class="nodecalc-filter-wrapper">
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
            </div>
            <h5 class="mb-3">
              Material prices fixed until api is working correctly.
              {{ timeUpdated }}
            </h5>
            <div class="nodecalc-list columns">
              <div
                v-for="(node, index) in nodes"
                :key="index"
                class="node-wrapper column is-one-third"
              >
                <Node
                  v-if="
                    node.materials[0].marketPrice || node.materials[0].codex
                  "
                  :name="node.name"
                  :contribution="node.contribution"
                  :image="node.image"
                  :materials="node.materials"
                  :region="node.region"
                  :workload="node.workload"
                  :distance="node.distance"
                  :average-yield="node.averageYield"
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
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    const nodes = await this.$axios
      .$get('https://morrolantv-dev-api.herokuapp.com/nodes')
      .then((res) => res)
    this.$store.commit('SET_NODES', nodes)
  },
  data() {
    return {
      heroimg: 'world',
      error: null,
      initialFilter: 'profit',
      filterMethod: 'profit',
      selectedRegion: '',
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
      if (this.nodes && this.nodes.length > 0 && this.nodes[0].materials[0]) {
        const [date, time] = this.nodes[0].materials[0].updated.split('T')
        return `Last Upated at ${date} ${time}`
      } else {
        return ''
      }
    },
    nodes() {
      switch (this.filterMethod) {
        case 'profit':
          return this.getNodesByProfit
        case 'region':
          return this.getNodesByRegion(this.selectedRegion)
        default:
          return this.getNodesByProfit
      }
    },
    ...mapGetters(['getNodesByProfit', 'getNodesByRegion']),
  },
  methods: {
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
  },
}
</script>
<style lang="scss" scoped>
.nodecalc-header {
  margin-bottom: 50px;
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
.region-filter {
  cursor: pointer;
}
</style>
