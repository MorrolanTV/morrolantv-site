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
            style="top: -100%"
            alt="Alt Text!"
          />
        </picture>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">User Profile</h1>
        <h3 class="subtitle is-3">Hello {{ user.email }}</h3>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  data() {
    return {
      heroimg: 'tools',
    }
  },
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.user
    },
  },
}
</script>
