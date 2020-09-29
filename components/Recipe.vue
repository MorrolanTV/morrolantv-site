<template>
  <div v-if="calculated" class="recipe">
    <div class="recipe-header">
      <h5 class="mb-2">{{ name }}</h5>
      <div class="skill">{{ level }}</div>
    </div>
    <div class="recipe-instructions">
      <div>
        <div class="ingredients">
          <div
            v-for="material of combinedMaterials"
            :key="material.name"
            class="ingredient-container"
            :class="acquisition"
          >
            <img
              class="ingredient"
              :src="material.image || getCodexImage(material.icon)"
            />
            <div class="name-holder">
              {{ material ? material.name : '' }}
            </div>
            <div class="quantity">{{ material.quantity || 1 }}</div>
          </div>
        </div>
      </div>
      <div>
        <img
          class="secondary"
          :src="products[1] ? getCodexImage(products[1].icon) : ''"
        />
        <img class="primary" :src="getCodexImage(products[0].icon)" />
      </div>
    </div>
    <div class="recipe-output">
      <div class="output">
        <div class="body-title">Profit Per</div>
        <div class="output-value">{{ parseValue(profit) }}</div>
      </div>
      <div class="output">
        <div class="body-title">Profit Per 900</div>
        <div class="output-value">{{ parseValue(perNineHundred) }}</div>
      </div>
      <div class="output">
        <div class="body-title">Hourly Profit</div>
        <div class="output-value">{{ parseValue(perHour) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    level: {
      type: String,
      required: true,
    },
    exp: {
      type: String,
      required: true,
    },
    baseProc: {
      type: Number,
      default: 2.5,
    },
    rareProc: {
      type: Number,
      default: 1.5,
    },
    baseMasteryMultipler: {
      type: Number,
      default: 0.5,
    },
    rareMasteryMultiplier: {
      type: Number,
      default: 0.2,
    },
    materials: {
      type: Array,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      calculated: false,
      cost: 0,
      practical: 0,
      profit: 0,
      acquisition: 'buy',
      perNineHundred: 0,
      perHour: 0,
    }
  },
  computed: {
    combinedMaterials() {
      return this.materials.map((x) => {
        if (x.Material) return x.Material
        if (x.Group) {
          const representativeItem =
            x.Group.Materials[x.Group.Materials.length - 1]
          return {
            name: x.Group.name,
            icon: representativeItem.icon,
            quantity: x.Group.quantity,
          }
        }
      })
    },
    ...mapGetters(['getRecipePractical']),
  },
  mounted() {
    this.calculate()
    this.calculatePractical()
    this.$store.commit('RECIPE_INITIALIZED', {
      id: this.id,
      data: this.practical,
    })
    this.calculated = true
  },
  methods: {
    calculate() {
      const cost = this.materials
        .map(this.getItemOrGroupPrice)
        .reduce((a, b) => a + b, 0)
      const base = this.localizedPrice(this.products[0]) || 0
      const rare = this.products[1]
        ? this.localizedPrice(this.products[1]) || 0
        : 0

      const profitPer = (base * 2.5 + rare * 0.3) * 0.845 - cost
      this.perNineHundred = 900 * profitPer
      this.perHour = profitPer * (900 * 4) // 4 is for the amount of cooking utensils you can get through in one hour

      // Testing
      if (this.name === 'Carrot Confit')
        console.log(cost, base, rare, profitPer)

      this.cost = cost
      this.profit = profitPer
    },

    calculatePractical() {
      // maybe take rares into acct.
      const cost = this.materials
        .map(this.getItemOrGroupPriceNoPractical)
        .reduce((a, b) => a + b, 0)

      const craftCost = cost / 2.5
      const purchaseCost = this.getItemOrGroupPriceNoPractical(this.products[0])

      this.practical = Math.min(purchaseCost, craftCost)
      if (this.localizedCount(this.products[0]) === 0) this.acquisition = 'make'
      if (this.practical === 0) this.acquisition = 'gather'
    },
    getItemOrGroupPriceNoPractical(material) {
      if (material.group)
        return Math.min(...material.Group.Materials.map(this.getItemPrice))
      return this.getItemPrice(material)
    },

    getItemOrGroupPrice(ingredient) {
      if (ingredient.Group)
        return (
          Math.min(...ingredient.Group.Materials.map(this.getItemPrice)) *
          (ingredient.quantity || 1)
        )
      if (
        this.localizedPrice(ingredient.Material) &&
        this.localizedPrice(ingredient.Material) === 0 &&
        this.getRecipePractical
      )
        return this.getRecipePractical
      return this.getItemPrice(ingredient.Material)
    },
    getItemOrGroupSellPrice(material) {
      if (material.group)
        return (
          Math.min(...material.group.map(this.getItemSellPrice)) *
          (material.quantity || 1)
        )
      return this.getItemSellPrice(material)
    },
    localizedPrice(matrial) {
      if (this.$store.state.playerRegion === 'NA') {
        return matrial.priceNA ? matrial.priceNA : null
      } else {
        return matrial.priceEU ? matrial.priceEU : null
      }
    },
    localizedCount(matrial) {
      if (this.$store.state.playerRegion === 'NA') {
        return matrial.countNA ? matrial.countNA : null
      } else {
        return matrial.countEU ? matrial.countEU : null
      }
    },
    getItemPrice(material) {
      if (JSON.stringify(material).includes('Carrot Confit'))
        console.log(this.localizedPrice(material) * (material.quantity || 1))
      if (this.localizedPrice(material))
        return this.localizedPrice(material) * (material.quantity || 1)
      const buy = material.codexBuyPrice ? material.codexBuyPrice : 0
      if (material.codexBuyPrice)
        return parseFloat(buy) * (material.quantity || 1)
      return 0
    },

    getItemSellPrice(material) {
      if (this.localizedPrice(material))
        return this.localizedPrice(material) * (material.quantity || 1) * 0.845
      const sell = material.codexSellPrice ? material.codexSellPrice : 0
      if (material.codexSellPrice)
        return parseFloat(sell) * (material.quantity || 1)
      return 0
    },

    parseValue(number) {
      if (!number) return '0'
      if (Math.abs(number) / 1e6 < 1)
        return Math.round((number / 1e4) * 100) / 10 + 'K'
      return Math.round((number / 1e6) * 100) / 100 + 'M'
    },

    getCodexImage(image) {
      return 'https://bdocodex.com/' + image
    },
  },
}
</script>
<style lang="scss">
.recipe {
  background: $grey-blue-medium;
  padding: 20px;
  .ingredients {
    display: flex;
  }
}
.recipe-instructions,
.recipe-header {
  display: flex;
  justify-content: space-between;
}

.recipe-header {
  width: 100%;
  margin-bottom: 5px;
}
</style>
