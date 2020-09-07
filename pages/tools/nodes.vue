<template>
  <main>
    <section class="section">
      <div class="container">
        <div v-for="(node, index) in nodes" :key="index" class="node-wrapper">
          <h4>{{ node.name }}</h4>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const nodes = await $axios.$get('http://localhost:5100/nodes')
    return { nodes }
  },
}
</script>
