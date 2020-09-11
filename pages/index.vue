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
          <div class="tw-wrapper">
            <iframe
              src="https://player.twitch.tv/?channel=morrolantv&parent=eloquent-keller-9336f4.netlify.app&parent=localhost"
              frameborder="0"
              allowfullscreen="false"
              scrolling="no"
              height="500"
              width="888"
            ></iframe>
          </div>
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
          <div class="social-wrapper">
            <div><h3 class="title is-3 mb-3">Social Media</h3></div>
            <div>
              <h5 class="subtitle is-5 mb-2">
                Stay connected, check out MorrolanTV on his channels
              </h5>
            </div>
            <div class="social">
              <a
                id="youtube"
                href="https://youtube.com/morrolantv"
                target="_blank"
                class="social"
              >
                <fa :icon="['fab', 'youtube']" />
              </a>
              <a
                id="discord"
                href="https://discord.gg/morrolantv"
                target="_blank"
                class="social"
              >
                <fa :icon="['fab', 'discord']" />
              </a>
              <a
                id="twitter"
                href="https://twitter.com/Morrolantv"
                target="_blank"
                class="social"
              >
                <fa :icon="['fab', 'twitter']" />
              </a>
            </div>
          </div>
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

.tw-wrapper {
  background: $blue;
  transition: 1s;
  box-shadow: purpleBoxShadow(8, false);
  height: 500px;
  width: 888px;
}

.stream-title {
  margin-top: 30px;
}

.social-wrapper {
  background: $blue;
  padding: 20px;
  transition: 1s;
  box-shadow: purpleBoxShadow(8, true);
}

@include layoutScrolled {
  .social-wrapper {
    transform: translateY(-50px);
  }
}

.social {
  display: flex;
  a {
    margin-top: 10px;
    margin-right: 20px;
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    font-size: 20px;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    &#youtube {
      background: linear-gradient(90deg, #e71414, #ff3232);
    }
    &#discord {
      background: linear-gradient(90deg, #7289da, #86a1ff);
    }
    &#twitter {
      background: linear-gradient(90deg, #1dcaff, #6cddff);
    }
  }
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
