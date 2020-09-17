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
        <h3 class="subtitle is-3">Manage your stored content</h3>
        <client-only placeholder="User Content">
          <div class="user-content">
            <div class="user-wrapper-nodes">Your Nodes</div>
            <div class="user-wrapper-recipes">Your Recipes</div>
          </div>
        </client-only>
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
