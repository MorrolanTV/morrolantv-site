<template>
  <main>
    <section class="section no-hero">
      <div class="container">
        <h1 class="title is-1">Black Desert Collection</h1>
        <h3 class="title is-3">Warrior Gear (Main)</h3>
        <h3 class="title is-3">Lifeskills</h3>
        <h3 class="title is-3">Stats</h3>
        <p>
          {{ canEdit }}
        </p>
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
  computed: {
    canEdit() {
      return (
        this.$auth.user &&
        this.$auth.user.sub === 'google-oauth2|117323980375187460896'
      )
    },
  },
}
</script>
