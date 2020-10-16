<template>
  <div class="top-button-wrapper" :class="{ show: visible }">
    <div class="top-button" @click="scrollTop">
      <fa :icon="['fas', 'chevron-up']" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
.top-button-wrapper {
  position: fixed;
  z-index: 5000;
  bottom: 20px;
  right: 20px;
  display: none;
  .top-button {
    background: $grey-blue;
    border: 1px solid white;
    width: 50px;
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  svg {
    width: 100%;
    height: 100%;
  }
}
.page-wrapper {
  &.scroll-up {
    .top-button-wrapper {
      display: block;
    }
  }
}
</style>
