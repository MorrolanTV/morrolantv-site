<template>
  <section class="section">
    <div class="container">
      <div class="section-title">
        <h2 class="title is-2">TOOLS</h2>
      </div>
      <div class="tl-container">
        <nuxt-link
          v-for="tool in tools"
          :key="tool.name"
          to="tool.path"
          class="tool"
          :style="{ backgroundImage: `url(${tool.image})` }"
        >
          <div class="tl-content px-4 py-5">
            <div class="name">{{ tool.name }}</div>
            <div class="game">{{ tool.gname }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.tl-container {
  display: grid;
  @include desktop {
    grid-template-areas:
      'g1 g2 g4 g4'
      'g1 g3 g4 g4';
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 250px 250px;
    gap: 20px;
  }
}

.tool {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-repeat: no-repeat;
  transition: 0.3s;
  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      grid-area: g#{$i};
    }
  }
  &:hover {
    z-index: 2;
    transform: translateY(-2px);
    box-shadow: 0 60px 90px -40px rgba(0, 0, 0, 0.6);
  }
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
      ],
    }
  },
}
</script>

<style></style>
