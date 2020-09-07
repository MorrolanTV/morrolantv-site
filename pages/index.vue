<template>
  <main>
    <section class="hero w-100">
      <div class="image-wrapper">
        <div
          class="image"
          :style="{ backgroundImage: `url(${backgroundUrl})` }"
        >
          <video></video>
        </div>
      </div>
      <div class="showcase-wrapper">
        <div class="showcase-element">
          <SocialShowcase />
        </div>
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
  max-height: none;
  align-items: center;
  position: relative;
  width: 100%;
  height: calc(65vh);
  min-height: 300px;
  margin-bottom: 100px;

  .image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
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

.showcase-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  padding: 0 100px;
}

.showcase-element {
  flex-basis: 350px;
}
</style>
