<template>
  <div
    class="page-wrapper"
    :class="{ scrolled: isScrolled, 'scroll-up': scrollUp }"
  >
    <Header />
    <Nuxt keep-alive />
    <Footer />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isScrolled: false,
      scrollUp: false,
      lastScroll: 0,
      lastScrollDirection: 0,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.lastScroll = window.scrollY
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      const s = window.scrollY
      let d
      this.isScrolled = s > 20
      if (s < this.lastScroll) d = 1
      else if (s > this.lastScroll) d = 2
      if (this.lastScrollDirection !== d) {
        this.scrollUp = !this.scrollUp
        this.lastScrollDirection = d
      }
      this.lastScroll = s
    },
  },
}
</script>
