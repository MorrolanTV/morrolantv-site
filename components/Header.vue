<template>
  <nav>
    <div class="logo-wrapper">
      <div class="logo-banner">
        <img src="~/assets/img/desktopLogo.png" />
      </div>
    </div>
    <div class="nav-items">
      <nuxt-link to="/" class="nav-item">Home</nuxt-link>
      <nuxt-link to="/tools" class="nav-item">Tools</nuxt-link>
      <nuxt-link to="/" class="nav-item">Gear</nuxt-link>
      <nuxt-link to="/" class="nav-item">Twitch</nuxt-link>
      <nuxt-link to="/" class="nav-item">About</nuxt-link>
    </div>
  </nav>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'

export default {
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    fas() {
      return fas
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  z-index: 1000;
  height: 78px;
  transition: top 0.25s;
  transition-timing-function: ease;
  background: linear-gradient(to bottom, rgba(18, 23, 28, 0.75), transparent);
  font-size: 13px;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
    transition-timing-function: ease;
    opacity: 0;
    background: #12171c;
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}

.nav-items {
  z-index: 100;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-item {
  padding: 0 20px;
  text-transform: uppercase;
  text-decoration: none;
  color: #f5f5f5;
}

.logo-wrapper {
  position: relative;
  width: 85px;
}

.logo-banner {
  position: absolute;
  top: 0;
  transition: 0.5s;
  transition-timing-function: ease;
}

@include layoutScrolled {
  nav {
    &::before {
      opacity: 1;
    }
    .logo-banner {
      transform: translateY(-40px);
    }
  }
}
</style>
