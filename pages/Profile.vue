<template>
  <main>
    <section class="section no-hero">
      <div class="container">
        <h1 class="title is-1">User Profile</h1>
        <client-only>
          <h3 v-if="$auth.loggedIn" class="title is-3">
            Hello {{ $auth.user.name }}
          </h3>
        </client-only>
        <div v-if="userSettings.lastActive">
          Your status: Last active at: {{ userSettings.lastActive }}
        </div>
        <h3 class="mt-4 title is-3">Your settings:</h3>
        <div class="user-settings-wrapper">
          <div class="mb-4">
            <p class="mb-2">Player region:</p>
            <div class="buttons has-addons mb-0 mr-2">
              <button
                class="button mb-0"
                :class="
                  userSettings.region === 'NA' ? 'is-selected is-warning' : ''
                "
                @click="
                  userSettings.region = 'NA'
                  saveSettings()
                "
              >
                NA
              </button>
              <button
                class="button mb-0"
                :class="
                  userSettings.region === 'EU' ? 'is-selected is-warning' : ''
                "
                @click="
                  userSettings.region = 'EU'
                  saveSettings()
                "
              >
                EU
              </button>
            </div>
          </div>
          <div class="mb-4">
            <p class="mb-2">Show fishing nodes:</p>
            <div class="buttons has-addons mb-0 mr-2">
              <button
                class="button mb-0"
                :class="
                  userSettings.showFishing === true
                    ? 'is-selected is-warning'
                    : ''
                "
                @click="
                  userSettings.showFishing = true
                  saveSettings()
                "
              >
                Yes
              </button>
              <button
                class="button mb-0"
                :class="
                  userSettings.showFishing === false
                    ? 'is-selected is-warning'
                    : ''
                "
                @click="
                  userSettings.showFishing = false
                  saveSettings()
                "
              >
                No
              </button>
            </div>
          </div>
          <div class="mb-4">
            <p>Active hours</p>
            <input
              :value="hours"
              type="number"
              class="input"
              placeholder="Hours"
              style="width: auto"
              @input="changedHours"
            />
          </div>
        </div>
        <div class="mt-4">
          <h3 class="subtitle is-3">Shortcuts:</h3>
          <p>
            - You can adjust your
            <nuxt-link to="/tools/nodes">NODES</nuxt-link> and save them to your
            profile.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  async fetch() {
    if (this.$auth.loggedIn) {
      const userData = await this.$axios
        .$get('/user/info', {
          headers: {
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        .then((res) => res)
      if (userData) {
        this.userSettings = userData
        this.$store.commit('SET_USER_SETTINGS', userData)
        this.$store.commit('nodes/SET_ACTIVE_HOURS', userData.activeHours)
      }
    }
  },
  data() {
    return {
      userSettings: '',
      saving: false,
      debounceTimeout: null,
    }
  },
  computed: {
    hours() {
      return this.userSettings.activeHours
    },
  },
  methods: {
    changedHours(e) {
      this.userSettings.activeHours = e.target.value
      this.saveSettings()
    },
    async saveSettings() {
      this.saving = true
      this.$store.commit('SET_USER_SETTINGS', this.userSettings)
      this.$store.commit(
        'nodes/SET_ACTIVE_HOURS',
        this.userSettings.activeHours
      )
      await this.$axios
        .$post('/user/info', {
          settings: JSON.stringify(this.userSettings),
          headers: {
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        .then(() => {
          this.saving = false
        })
    },
  },
  fetchOnServer: false,
  middleware: 'auth',
}
</script>
