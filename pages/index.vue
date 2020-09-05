<template>
  <main>
    <section class="hero">
      <div class="image" :style="{ backgroundImage: `url(${backgroundUrl})` }">
        <video></video>
      </div>
      <div>
        <!--<iframe
          src="https://player.twitch.tv/?channel=morrolantv&parent=morrolantv-dev.herokuapp.com"
          frameborder="0"
          allowfullscreen="false"
          scrolling="no"
          height="100%"
          width="100%"
        ></iframe>-->
      </div>
    </section>
    <Toollist />
  </main>
</template>

<script>
import backgroundUrl from '~/assets/img/background.png'
export default {
  data() {
    return { backgroundUrl }
  },
}
</script>

<style></style>
