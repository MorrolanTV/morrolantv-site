<template>
  <main>
    <section class="section no-hero">
      <div class="container">
        <h1 class="title is-1">User Profile</h1>
        <client-only>
          <h3 v-if="$auth.loggedIn" class="title is-3">
            Hello {{ $auth.user.name }}
          </h3>
        </client-only>
        <h5 class="subtitle is-5">
          The profile page will be expanded in the future
        </h5>
        <div v-if="active">Your status: Last active at: {{ active }}</div>
        <h3 class="mt-4 title is-3">Functions for users:</h3>
        <p>
          - You can adjust your
          <nuxt-link to="/tools/nodes">NODES</nuxt-link> and save them to your
          profile.
        </p>
        <p>
          - As a logged in user you can save
          <nuxt-link to="/tools">RECIPES</nuxt-link> in your cookbok.
        </p>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  async fetch() {
    if (this.$auth.loggedIn) {
      const stats = await this.$axios
        .$get('/user/info', {
          headers: {
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        .then((res) => res)
      if (stats) {
        this.active = stats.activeAt
      }
    }
  },
  data() {
    return {
      heroimg: 'tools',
      active: '',
    }
  },
  fetchOnServer: false,
  middleware: 'auth',
}
</script>
