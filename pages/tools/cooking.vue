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
        <h1 class="title is-1">Cooking Calculator</h1>
        <div class="recipe-calculator">
          <div v-if="$fetchState.pending || 1" class="loader"></div>
          <div v-else-if="$fetchState.error" class="error-wrapper">
            <div class="error">
              <h3 class="title">API ERROR</h3>
              <h5 class="subtitle">COULD NOT FETCH DATA</h5>
              <p>Our API is having trouble at the moment, check back later.</p>
            </div>
          </div>
          <div v-else>
            <div class="recipecalc-header">
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
                {{ timeUpdated }}
              </h5>
            </div>
            <div v-if="recipes.length > 0" class="recipe-list columns">
              <div
                v-for="recipe in recipes"
                :key="recipe.id"
                class="recipe-wrapper column is-one-third"
              >
                <Recipe
                  :id="recipe.id"
                  :name="recipe.name"
                  :image="recipe.image"
                  :level="recipe.level"
                  :exp="recipe.exp"
                  :materials="recipe.RecipeIngredients"
                  :products="recipe.products"
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
  data() {
    return {
      heroimg: 'world',
      error: null,
      cookbook: [],
    }
  },
  // eslint-disable-next-line vue/order-in-components
  async fetch() {
    // Fetch default node data
    /* const cookbook = await this.$axios.$get('/recipes').then((res) => {
      return res
    })
    this.cookbook = cookbook
    const tree = this.buildRecipeTree().flat()
    this.$store.commit('SET_RECIPE_TREE', tree) */
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
    recipes() {
      return this.getRecipes
    },
    ...mapGetters(['getRecipes', 'getRecipesByProfit']),
  },
  fetchOnServer: false,
  methods: {
    buildRecipeTree(agg = [this.findAllBottomTierRecipes()]) {
      const step = Array.from(
        new Set(
          agg[agg.length - 1]
            .map((recipe) => {
              const amount = this.cookbook.filter(
                (x) =>
                  x.RecipeIngredients.findIndex((ing) => {
                    return ing.Material
                      ? ing.Material.id === recipe.products[0].id
                      : false
                  }) !== -1
              )
              return amount
            })
            .flat()
        )
      )

      if (step.length === 0) return agg
      else agg.push(step)

      return this.buildRecipeTree(agg)
    },

    findAllBottomTierRecipes() {
      return this.cookbook.filter((recipe) => {
        const amount = recipe.RecipeIngredients.filter((material) => {
          if (material.Material) {
            return (
              this.cookbook.findIndex(
                (r) => r.products[0].id === material.Material.id
              ) !== -1
            )
          }
        }).length
        return amount === 0
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.recipecalc-header {
  margin-bottom: 50px;
}
.recipe-list {
  flex-wrap: wrap;
}
</style>
