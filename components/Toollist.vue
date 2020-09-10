<template>
  <ContentBoxes grid-class="tl-container" title="BDO Tools" :entries="tools" />
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
    img {
      transition: 0.3s;
    }
    &:hover {
      img {
        filter: blur(3px);
      }
    }
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        grid-area: g#{$i};
      }
    }
  }
  .content {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
<script>
export default {
  data() {
    return {
      tools: [
        {
          name: 'Cooking Calculator',
          gname: 'Black Desert Online',
          desc: 'Learn what recepies are best to cook',
          image: 'cooking',
          path: '/tools/nodes',
        },
        {
          name: 'Crate Calculator',
          gname: 'Black Desert Online',
          desc: 'Coming soon',
          image: 'crate',
          path: '/',
        },
        {
          name: 'Horse Breeding',
          gname: 'Black Desert Online',
          desc: 'Coming soon',
          image: 'horse',
          path: '/',
        },
        {
          name: 'Workers Guide',
          gname: 'Black Desert Online',
          desc: 'Check out the most profitable nodes, simulate outcomes',
          image: 'nodes',
          path: '/',
        },
      ],
    }
  },
}
</script>

<style></style>
