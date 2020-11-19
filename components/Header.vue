<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="{ isActive: isActive }"
  >
    <div class="navbar-brand">
      <div class="logo-wrapper">
        <nuxt-link to="/" class="logo-banner">
          <img src="~/assets/img/desktopLogo.png" />
        </nuxt-link>
      </div>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="openMenu()"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="nav-items navbar-brand">
        <nuxt-link to="/" class="nav-item" @click.native="closeMenu()"
          >Home</nuxt-link
        >
        <nuxt-link to="/tools" class="nav-item" @click.native="closeMenu()"
          >Tools</nuxt-link
        >
        <nuxt-link to="/gear" class="nav-item" @click.native="closeMenu()"
          >Gear</nuxt-link
        >
        <nuxt-link to="/stream" class="nav-item" @click.native="closeMenu()"
          >Stream</nuxt-link
        >
        <nuxt-link to="/about" class="nav-item" @click.native="closeMenu()"
          >About</nuxt-link
        >
        <client-only>
          <nuxt-link
            v-if="$auth.loggedIn"
            to="/profile"
            class="nav-item"
            @click.native="closeMenu()"
            >Profile</nuxt-link
          >
        </client-only>
        <client-only
          ><a v-if="$auth.loggedIn" class="nav-item" @click="logout()"
            >LOGOUT</a
          ></client-only
        >
        <client-only
          ><a
            v-if="!$auth.loggedIn"
            class="nav-item"
            @click="$auth.loginWith('auth0')"
            >LOGIN</a
          ></client-only
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    openMenu() {
      this.isActive = !this.isActive
    },
    closeMenu() {
      this.isActive = false
    },
    logout() {
      this.$auth.logout()
      window.location.href =
        'https://dev-83h5hy98.us.auth0.com/v2/logout?returnTo=' +
        process.env.logoutUrl
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
  background: $background-header-effect;
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
    background: $background-header;
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}

.navbar-burger {
  height: 78px;
  &:hover {
    background: none;
    color: $link;
  }
}

.navbar-menu {
  justify-content: flex-end;
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
  outline: none;
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

@media (max-width: 1023px) {
  nav {
    display: block;
    padding: 0;
    &::before {
      transition: none;
    }
    &.isActive {
      &::before {
        opacity: 1;
      }
      .logo-banner {
        transform: translateY(-40px);
      }
      .navbar-menu {
        display: block;
      }
    }
  }
  .navbar-brand {
    width: 100%;
    padding: 0 50px;
  }
  .nav-items {
    flex-direction: column;
  }
  .nav-item {
    margin: 20px 0;
  }
}

@media (max-width: 718px) {
  .logo-banner {
    transform: translateY(-40px);
  }
}
</style>
