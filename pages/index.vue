<template>
  <main>
    <section class="hero w-100">
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
            alt="Alt Text!"
          />
        </picture>
      </div>
      <div class="showcase-wrapper str">
        <div class="showcase-element">
          <TwitchPlayer />
        </div>
        <div class="stream-title">
          <h1 class="title is-uppercase has-lineupper">
            {{ streamMessage }}
          </h1>
          <h6 v-if="!twitchState.live" class="subtitle is-6">
            <a href="#highlight"
              >While you wait, check out the video collection
              <fa :icon="['fas', 'chevron-right']"
            /></a>
          </h6>
        </div>
      </div>
      <div class="showcase-wrapper section soc">
        <div class="showcase-element">
          <SocialShowcase />
        </div>
      </div>
      <div class="angle-right"></div>
    </section>
    <Toollist />
    <GameCollection />
  </main>
</template>

<script>
export default {
  data() {
    return { heroimg: 'background', twitchState: {} }
  },
  // eslint-disable-next-line vue/order-in-components
  asyncData({ $axios }) {
    let base = 'http://localhost:8888'
    if (process.env.NODE_ENV === 'production')
      base = 'https://eloquent-keller-9336f4.netlify.app'
    return $axios
      .$get(base + '/api/twitchapi/live')
      .then((res) => {
        return { twitchState: res }
      })
      .catch((e) => {
        const data = { live: false }
        return { twitchState: data }
      })
  },
  computed: {
    streamMessage() {
      return this.twitchState.live
        ? 'MorrolanTV is live on Twitch'
        : 'MorrolanTV is currently not streaming'
    },
  },
}
</script>

<style lang="scss">
.showcase-wrapper {
  display: flex;
  width: 100%;
  position: absolute;
  z-index: 200;
  &.soc {
    justify-content: flex-end;
    bottom: 0;
    transform: translateY(50%);
    padding: 0 100px;
    .showcase-element {
      flex-basis: 350px;
    }
  }
  &.str {
    flex-direction: column;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    .showcase-element {
      width: 888px;
      flex-grow: 0;
    }
  }
}

.stream-title {
  margin-top: 30px;
}

.angle-right {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0px;
  background: linear-gradient(
      to right bottom,
      transparent 49%,
      $grey-darker 50%
    ),
    linear-gradient(-50deg, $grey-darker 16px, transparent 0);
  z-index: 2;
}
</style>
