<template>
  <main>
    <section class="hero subpage w-100">
      <div class="image-wrapper">
        <div
          class="image"
          :style="{ backgroundImage: `url(${backgroundUrl})` }"
        ></div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div v-if="error" class="error-wrapper">
          <div class="error">
            <h3 class="title">{{ error.title }}</h3>
            <h5 class="subtitle">{{ error.subtitle }}</h5>
            <p>{{ error.text }}</p>
          </div>
        </div>
        <div class="node-calculator">
          <div class="nodecalc-header">Sort WIP, Filter WIP</div>
          <h5 class="title is-h5">
            {{ timeUpdated }}
          </h5>
          <div class="nodecalc-list columns">
            <div
              v-for="(node, index) in nodes"
              :key="index"
              class="node-wrapper column is-one-third"
            >
              <Node
                v-if="node.materials[0].marketPrice || node.materials[0].codex"
                :name="node.name"
                :contribution="node.contribution"
                :image="node.image"
                :materials="node.materials"
                :region="node.region"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import backgroundUrl from '~/assets/img/tools/general/world.png'
export default {
  data() {
    return { backgroundUrl, error: null, nodes: [] }
  },
  // eslint-disable-next-line vue/order-in-components
  asyncData({ $axios, error }) {
    return $axios
      .$get('https://morrolantv-dev-api.herokuapp.com/nodes')
      .then((res) => {
        return { nodes: res }
      })
      .catch((e) => {
        error({ statusCode: 500, message: e })
      })
  },
  computed: {
    timeUpdated() {
      if (this.nodes[0].materials[0]) {
        const [date, time] = this.nodes[0].materials[0].updated.split('T')
        return `Last Upated at ${date} ${time}`
      } else {
        return ''
      }
    },
  },
}
</script>
<style lang="scss">
.nodecalc-header {
  margin-bottom: 50px;
}
.nodecalc-list {
  flex-wrap: wrap;
}
</style>
