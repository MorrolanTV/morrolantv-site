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
              src="https://player.twitch.tv/?channel=morrolantv&parent=eloquent-keller-9336f4.netlify.app&parent=localhost&parent=sirfilior-dev.com"
              frameborder="0"
              allowfullscreen="false"
              scrolling="no"
              height="100%"
              width="100%"
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
      <div class="blackspirit-wrapper">
        <img :src="require('~/assets/img/blackspirit.svg')" />
      </div>
    </section>
    <section class="section content mobile">
      <div class="stream-title mobile">
        <h1 class="title is-uppercase">
          {{ streamMessage }}
        </h1>
        <h6 v-if="!twitchState.live" class="subtitle is-6">
          <a href="#highlight"
            >While you wait, check out the video collection
            <fa :icon="['fas', 'chevron-right']"
          /></a>
        </h6>
      </div>
    </section>
    <Toollist />
    <div class="blackspirit-wrapper push">
      <img :src="require('~/assets/img/blackspirit_push.svg')" />
    </div>
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
    transform: translateY(30%);
    padding: 0 100px;
    right: 0;
    width: auto;
    z-index: 210;
    .showcase-element {
      flex-basis: 350px;
    }
    @media (max-width: 1906px) {
      padding: 0;
      transform: translateY(0%);
      .showcase-element {
        flex-basis: auto;
        .social-wrapper {
          padding: 4px 20px 12px 20px;
          box-shadow: none;
        }
        .title,
        .subtitle {
          display: none;
        }
        .social {
          flex-direction: column;
          a {
            margin-right: 0;
          }
        }
      }
    }
    @media (max-width: 718px) {
      display: none;
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
      @media (max-width: 1250px) {
        width: 444px;
      }
      @media (max-width: 625px) {
        width: 333px;
      }
    }
    @media (max-width: 718px) {
      transform: translateY(-35%);
      .stream-title {
        display: none;
      }
    }
  }
}

.tw-wrapper {
  background: $background-accent;
  transition: 1s;
  box-shadow: boxShadow(8, false, $yellow);
  height: 500px;
  width: 888px;
  @media (max-width: 1250px) {
    width: 444px;
    height: 250px;
  }
  @media (max-width: 625px) {
    width: 333px;
    height: 188px;
  }
}

.stream-title {
  margin-top: 30px;
  &.mobile {
    margin-bottom: 50px;
    display: none;
    text-align: center;
    @media (max-width: 718px) {
      display: block;
    }
  }
}

.social-wrapper {
  background-color: #11171e;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23162637' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
  padding: 20px;
  transition: 1s;
  box-shadow: boxShadow(8, true, $yellow);
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
    &:hover {
      color: $link;
    }
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

.blackspirit-wrapper {
  position: absolute;
  bottom: -35px;
  left: 100px;
  &.push {
    position: relative;
    img {
      position: absolute;
      right: 150px;
      top: -42px;
    }
  }
  img {
    width: 200px;
    opacity: 0.8;
  }
}
</style>
