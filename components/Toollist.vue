<template>
  <ContentBoxes
    grid-class="tl-container"
    title="Content Highlights"
    :entries="tools"
  />
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
  .content-box {
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        grid-area: g#{$i};
      }
    }
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
          image: 'cooking',
          path: '/tools/nodes',
        },
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: 'cooking',
          path: '/',
        },
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: 'cooking',
          path: '/',
        },
        {
          name: 'Node Calculator',
          gname: 'Black Desert Online',
          image: 'cooking',
          path: '/',
        },
      ],
    }
  },
}
</script>

<style></style>
