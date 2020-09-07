<template>
  <div class="page-wrapper" :class="{ scrolled: isScrolled }">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isScrolled: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      // Your scroll handling here
      this.isScrolled = window.scrollY > 20
    },
  },
}
</script>
