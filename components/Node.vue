<template>
  <div
    class="node-wrapper"
    :class="group ? `grouped group-${group.id}` : ''"
    @click="handleLink"
  >
    <div
      class="node-header"
      :style="{
        'background-image': `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${image})`,
      }"
      @click="openForm()"
    >
      <div class="node-header-left is-flex align-center">
        <h5 class="node-name mr-2">{{ name }}</h5>
        <div class="material-list is-flex">
          <div
            v-for="material in materials"
            :key="material.id"
            class="materialimg-wrapper"
            :data-tooltip="
              material.name + (materialFlooded(material) ? ' - flooded' : '')
            "
          >
            <img class="materialimg" :src="getCodexImage(material.icon)" />
            <div v-if="materialFlooded(material)" class="flooded"></div>
          </div>
        </div>
      </div>
      <div class="node-header-right is-flex align-center">
        <h5 class="node-stats mr-2">
          <span style="display: block; white-space: nowrap">{{
            `${parseValue(profitCP)} `
          }}</span
          ><span style="white-space: nowrap">CP {{ cp }}</span>
        </h5>
        <img
          class="region-image"
          :src="generateRegionImage()"
          alt="Alt Text!"
        />
      </div>
    </div>
    <div class="node-form" :class="{ edit: edit }">
      <div class="field">
        <div class="field-body">
          <div class="field">
            <label class="label">Worker</label>
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select v-model="worker">
                  <option v-for="w in workers" :key="w.name" :value="w">
                    {{ w.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Lodging</label>
            <div class="control">
              <div class="select">
                <select v-model="home">
                  <option
                    v-for="(value, propertyName) in distances"
                    :key="propertyName"
                    :value="propertyName"
                  >
                    {{ propertyName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field field-cp is-narrow">
            <label class="label">CP Used</label>
            <div class="control">
              <input
                v-model.number="cpInput"
                type="number"
                class="input"
                placeholder="Contribution"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <label class="label">Workspeed</label>
          <div class="control">
            <input
              v-model.number="workSpeed"
              class="input"
              type="number"
              placeholder="Workspeed"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Movespeed</label>
          <div class="control">
            <input
              v-model.number="moveSpeed"
              class="input"
              type="number"
              placeholder="Movespeed"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: null,
    },
    contribution: {
      type: Number,
      default: 1,
      required: false,
    },
    cpAdd: {
      type: Number,
      default: 1,
      required: false,
    },
    image: {
      type: String,
      default: '',
      required: false,
    },
    materials: {
      type: Array,
      default: null,
      required: true,
    },
    workload: {
      type: Number,
      default: 0,
      required: true,
    },
    presetWorkspeed: {
      type: Number,
      default: 0,
    },
    presetMovespeed: {
      type: Number,
      default: 0,
    },
    distances: {
      type: Object,
      required: true,
    },
    lodging: {
      type: String,
      default: '',
    },
    region: {
      type: String,
      default: '',
      required: true,
    },
    group: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      profit: 0,
      profitGroup: 0,
      cpGroup: 0,
      minutesPerTask: 0,
      workSpeed: 0,
      moveSpeed: 0,
      home: null,
      worker: null,
      cpInput: 0,
      cpLocal: 0,
      initial: true,
      edit: false,
    }
  },
  computed: {
    profitCP() {
      if (!this.group) return this.cp > 0 ? this.profit / this.cp : 0
      else return this.cp > 0 ? (this.profitGroup + this.profit) / this.cp : 0
    },
    cp() {
      return this.cpLocal + this.cpInput + this.cpGroup
    },
    ...mapState([
      'workers',
      'profitList',
      'nodes',
      'groupStatsUpdated',
      'groupProfitsUpdated',
      'nodeGroupsCalculated',
      'linkingActive',
      'linkSelected',
    ]),
  },
  watch: {
    nodeGroupsCalculated() {
      if (this.group) {
        this.profitGroup = this.nodes.get(this.id).groupProfit
          ? this.nodes.get(this.id).groupProfit
          : 0
      }
      this.applyFormWatchers()
    },
    groupStatsUpdated() {
      if (this.group) {
        this.cpGroup = this.nodes.get(this.id).groupCP
          ? this.nodes.get(this.id).groupCP
          : 0
        this.calculate()
        this.$store.commit('GROUP_NODE_RECALCUATED', this.id)
      }
    },
    groupProfitsUpdated() {
      if (this.group) {
        this.profitGroup = this.nodes.get(this.id).groupProfit
          ? this.nodes.get(this.id).groupProfit
          : 0
      }
    },
  },
  beforeMount() {
    // Assign to edit in v-model
    this.cpInput = this.cpAdd
    this.cpLocal = this.contribution
    this.home = this.lodging
    if (this.group) {
      for (const id of this.group.links) {
        const node = this.nodes.get(id)
        this.cpGroup += node.contribution
        this.cpGroup += node.cpAdd
      }
    }
  },
  mounted() {
    const profits = this.workers.map(
      (stats) =>
        this.detailedReport(
          stats.work,
          stats.movement,
          stats.stamina,
          stats.luck
        ).profit
    )
    const index = profits.indexOf(Math.max(...profits))

    this.worker = this.workers[index]
    this.workSpeed =
      this.presetWorkspeed > 0 ? this.presetWorkspeed : this.worker.work
    this.moveSpeed =
      this.presetMovespeed > 0 ? this.presetMovespeed : this.worker.movement
    this.calculate()
  },
  methods: {
    calculate() {
      const { profit, minutesPerTask } = this.detailedReport(
        this.workSpeed,
        this.moveSpeed,
        this.worker.stamina,
        this.worker.luck
      )
      this.profit = profit
      this.minutesPerTask = minutesPerTask
      this.$store.commit('SET_NODE_PROFIT', {
        id: this.id,
        data: {
          cp: this.cp,
          profit: this.profit,
          profitCP: this.profitCP,
        },
      })
    },
    detailedReport(workSpeed, moveSpeed, stamina, luck) {
      const timeWorking = this.calculateTimeWorking(this.workload, workSpeed)
      const timeTravelling = this.calculateTravelTime(
        moveSpeed,
        this.getDistanceFromLodging()
      )
      const total = timeWorking + timeTravelling
      const minutesPerTask = total / 60
      const cyclesPerDay = this.calculateCycles(24, minutesPerTask, stamina)
        .total
      const priceReduce = (a, mat) => {
        if (this.materialFlooded(mat)) return a + 0
        return (
          a +
          cyclesPerDay *
            ((mat.NodeMaterial.yield + (luck / 100) * mat.NodeMaterial.luck) *
              this.getItemPrice(mat))
        )
      }
      const profit = Math.floor(this.materials.reduce(priceReduce, 0))
      return {
        timeWorking,
        timeTravelling,
        total,
        minutesPerTask,
        cyclesPerDay,
        profit,
      }
    },
    handleLink() {
      if (this.linkingActive) {
        this.$store.commit('NODE_LINK', this.id)
      }
    },
    getCodexImage(image) {
      return 'https://bdocodex.com/' + image
    },

    generateRegionImage() {
      return require(`~/assets/img/tools/general/REGION_${this.region.toLowerCase()}.png`)
    },
    getItemPrice(material) {
      const marketPrice = this.getLocalizedPrice(material)
      const codexPrice = material.codexBuyPrice ? material.codexBuyPrice : 0
      return marketPrice || codexPrice
    },
    getLocalizedPrice(material) {
      return this.$store.state.playerRegion === 'NA'
        ? material.priceNA
        : material.priceEU
    },
    getLocalizedCount(material) {
      return this.$store.state.playerRegion === 'NA'
        ? material.countNA
        : material.countEU
    },
    materialFlooded(material) {
      return this.getLocalizedCount(material) > 100000
    },
    getDistanceFromLodging() {
      return this.distances[this.home]
    },
    parseTime(minutes) {
      const displayHours = Math.floor(minutes / 60)
      const displayMinutes = minutes - displayHours * 60
      return displayHours
        ? `${Math.round(displayHours)}H ${Math.round(displayMinutes)}MIN`
        : `${Math.round(displayMinutes)}MIN`
    },

    parseValue(number) {
      if (!number) return '0'
      if (number / 1e6 < 1) return Math.round((number / 1e4) * 100) / 10 + 'K'
      return Math.round((number / 1e6) * 100) / 100 + 'M'
    },

    /**
     * Calculate the tamount of time a worker is working on a node.
     * @param {*} workload - The workload of the node the worker is working on.
     * @param {*} workspeed - The workspeed of the worker.
     */
    calculateTimeWorking(workload, workspeed) {
      return Math.ceil(workload / workspeed) * 10 * 60
    },

    /**
     * Calculate the amount of time needed for a worker to complete a task.
     * @param {Number} movementSpeed - The movement speed of the worker.
     * @param {Number} distance - The distance the worker will be travelling.
     */
    calculateTravelTime(movementSpeed, distance) {
      return (distance / movementSpeed) * 2
    },

    /**
     * Calculate the amount of cycles a worker will be able to achieve.
     * @param {Number} activeHours - The active amount of hours you play every day.
     * @param {Number} minutesPerTask  - The total amount of time it takes
     * @param {Number} stamina - The stamina of a worker.
     */
    calculateCycles(activeHours, minutesPerTask, stamina) {
      const activeCycles = (activeHours * 60) / minutesPerTask
      const inactiveCycles = Math.min(
        ((24 - activeHours) * 60) / minutesPerTask,
        stamina
      )

      return {
        activeCycles,
        inactiveCycles,
        total: activeCycles + inactiveCycles,
      }
    },
    applyFormWatchers() {
      this.$watch('worker', function (newVal, oldVal) {
        this.workSpeed = this.worker.work
        this.moveSpeed = this.worker.movement
        this.calculate()
        this.$emit('recalculated')
      })
      this.$watch('cpInput', function () {
        this.updateNode()
      })
      this.$watch('workSpeed', function (newVal, oldVal) {
        this.updateNode()
      })
      this.$watch('moveSpeed', function (newVal, oldVal) {
        this.updateNode()
      })
      this.$watch('home', function (newVal, oldVal) {
        this.updateNode()
      })
    },
    updateNode() {
      this.calculate()
      this.$store.commit('UPDATE_NODE', {
        id: this.id,
        data: {
          cp: this.cpInput,
          workspeed: this.workSpeed,
          movespeed: this.moveSpeed,
          lodging: this.home,
          group: this.group,
          groupCP: this.cpGroup,
          updateLinks: !!this.group,
        },
      })
      this.$emit('recalculated')
    },
    openForm() {
      if (!this.linkingActive) {
        this.edit = !this.edit
      }
    },
  },
}
</script>
<style lang="scss">
.node-header {
  background-color: $grey-blue;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .region-image {
    height: 40px;
  }
  .materialimg {
    max-height: 44px;
  }
  .materialimg-wrapper {
    position: relative;
    &:last-child {
      margin-right: 10px;
    }
  }
  .flooded {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 11px;
    left: 11px;
    background-image: url("data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'%3E%3Cdefs%3E%3Cstyle%3E.cls-1,.cls-3%7Bopacity:0.65;%7D.cls-2,.cls-3%7Bfill:%23c1272d;%7D%3C/style%3E%3C/defs%3E%3Cg class='cls-1'%3E%3Crect class='cls-2' y='40' width='44' height='4'/%3E%3C/g%3E%3Cpolyline class='cls-3' points='31.75 23.38 31.75 0 12.25 0 12.25 23.38 0 23.38 22 40 44 23.38'/%3E%3Cg class='cls-1'%3E%3Cpath d='M20.66,9.68c0,3.15-1.65,4.71-3.58,4.71s-3.48-1.49-3.5-4.51,1.63-4.66,3.61-4.66S20.66,6.83,20.66,9.68Zm-5.47.14c0,1.9.67,3.35,1.93,3.35s1.93-1.42,1.93-3.4c0-1.82-.52-3.33-1.93-3.33S15.19,7.93,15.19,9.82Zm1.75,10.85L25.72,5.22H27L18.23,20.67Zm13.45-4.81c0,3.15-1.65,4.72-3.56,4.72s-3.48-1.5-3.5-4.49S25,11.4,26.94,11.4,30.39,13,30.39,15.86ZM24.92,16c0,1.91.71,3.36,1.95,3.36S28.8,17.93,28.8,16s-.52-3.34-1.93-3.34S24.92,14.12,24.92,16Z'/%3E%3C/g%3E%3C/svg%3E");
  }
}
.node-header-left {
  flex-grow: 1;
  justify-content: space-between;
}
.node-header-right {
  flex-shrink: 0;
}
.node-form {
  max-height: 0;
  transition: max-height 0.2s;
  overflow: hidden;
  &.edit {
    max-height: 300px;
  }
  .field-cp {
    flex-basis: 100px;
  }
}
</style>
