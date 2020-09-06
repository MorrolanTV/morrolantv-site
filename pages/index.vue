<template>
  <main>
    <section class="hero w-100">
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

<style lang="scss">
.hero {
  max-width: 100%;
  flex-direction: row;
  padding: 10vh 0;
  max-height: none;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: calc(65vh);
  min-height: 300px;
  margin-bottom: 50px;

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-position: center 15%;
    background-size: cover;
  }
}
</style>
