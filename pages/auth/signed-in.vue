<template>
  <p>Signing in...</p>
</template>
<script>
export default {
  middleware({ store, redirect }) {
    // Redirect back to tool if set
    if (store.state.redirectUrl) {
      store.commit('CLEAR_REDIRECT_URL')
      return redirect(store.state.redirectUrl)
    } else {
      return redirect('/')
    }
  },
}
</script>
