<template>
  <div class="node-wrapper">
    <div
      class="node-header"
      :style="{
        'background-image': `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${image})`,
      }"
    >
      <div class="is-flex align-center">
        <h5 class="mr-2">{{ name }}</h5>
        <div
          v-for="material in materials"
          :key="material.id"
          class="resimg-wrapper"
        >
          <img class="resimg" :src="getCodexImage(material.icon)" />
        </div>
      </div>
      <div class="is-flex align-center">
        <h5 class="mr-2">{{ parseValue(profitCP) }}</h5>
        <img
          class="region-image"
          :src="generateRegionImage()"
          alt="Alt Text!"
        />
      </div>
    </div>
    <div class="node-form">
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
          <div class="field field-cp is-narrow">
            <label class="label">CP</label>
            <div class="control">
              <input
                v-model.number="cp"
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
    distance: {
      type: Number,
      default: 0,
      required: true,
    },
    averageYield: {
      type: Number,
      default: 0,
      required: true,
    },
    region: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      profit: 0,
      minutesPerTask: 0,
      workSpeed: 0,
      moveSpeed: 0,
      worker: null,
      cp: 0,
      initial: true,
    }
  },
  computed: {
    profitCP() {
      return this.cp > 0 ? this.profit / this.cp : 0
    },
    ...mapState(['workers']),
  },
  mounted() {
    this.cp = this.contribution
    const profits = this.workers.map(
      (stats) =>
        this.detailedReport(stats.work, stats.movement, stats.stamina).profit
    )
    const index = profits.indexOf(Math.max(...profits))

    this.worker = this.workers[index]
    this.workSpeed = this.worker.work
    this.moveSpeed = this.worker.movement
    this.calculate()
    this.applyFormWatchers()
  },
  methods: {
    applyFormWatchers() {
      this.$watch('cp', function () {
        this.calculate()
        this.$emit('recalculated')
      })
      this.$watch('worker', function (newVal, oldVal) {
        this.workSpeed = this.worker.work
        this.moveSpeed = this.worker.movement
        this.calculate()
        this.$emit('recalculated')
      })
      this.$watch('workSpeed', function (newVal, oldVal) {
        this.calculate()
        this.$emit('recalculated')
      })
      this.$watch('moveSpeed', function (newVal, oldVal) {
        this.calculate()
        this.$emit('recalculated')
      })
    },
    calculate() {
      const { profit, minutesPerTask } = this.detailedReport(
        this.workSpeed,
        this.moveSpeed,
        this.worker.stamina
      )
      this.profit = profit
      this.minutesPerTask = minutesPerTask
      this.$store.commit('SET_NODE_PROFIT', {
        id: this.id,
        profit: this.profitCP,
      })
    },
    detailedReport(workSpeed, moveSpeed, stamina) {
      const timeWorking = this.calculateTimeWorking(this.workload, workSpeed)
      const timeTravelling = this.calculateTravelTime(moveSpeed, this.distance)
      const total = timeWorking + timeTravelling
      const minutesPerTask = total / 60
      const cyclesPerDay = this.calculateCycles(15, minutesPerTask, stamina)
        .total
      const profit = Math.floor(
        this.materials
          .map((x) => this.getItemPrice(x))
          .reduce((a, b) => a + b, 0) *
          cyclesPerDay *
          this.averageYield -
          (1030 / 3) * cyclesPerDay
      )
      return {
        timeWorking,
        timeTravelling,
        total,
        minutesPerTask,
        cyclesPerDay,
        profit,
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
      if (activeHours > 24)
        this.error = {
          title: 'WRONG INPUT',
          subtitle: 'There cannot be more than 24 hours in a day.',
          text: 'The value got auto adjusted to max',
        }
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
  },
}
</script>
<style lang="scss">
.node-header {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  .region-image {
    height: 40px;
  }
}
.node-form {
  background: $background-secondary;
  padding: 20px;
  .field-cp {
    flex-basis: 60px;
  }
}
</style>
