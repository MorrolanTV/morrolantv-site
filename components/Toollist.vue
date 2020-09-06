<template>
  <section>
    <h1 class="padded">Tools</h1>
    <div class="tl-container">
      <nuxt-link
        v-for="tool in tools"
        :key="tool.name"
        to="tool.path"
        class="tool"
        :style="{ backgroundImage: `url(${tool.image})` }"
      >
        <div class="name">{{ tool.name }}</div>
        <div class="game">{{ tool.gname }}</div>
      </nuxt-link>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.tl-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 150px 150px;
}
.tool {
  display: block;
}
</style>
<script>
export default {
  data() {
    return {
      tools: [
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: require('~/assets/img/tools/worker.png'),
          path: '/',
        },
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: require('~/assets/img/tools/cooking.png'),
          path: '/',
        },
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: require('~/assets/img/tools/processing.png'),
          path: '/',
        },
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: require('~/assets/img/tools/scroll.png'),
          path: '/',
        },
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: require('~/assets/img/tools/trading.png'),
          path: '/',
        },
      ],
    }
  },
}
</script>

<style></style>
