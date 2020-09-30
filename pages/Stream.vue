<template>
  <main>
    <section class="section no-hero">
      <div class="container">
        <h1 class="title is-1">Stream Hub</h1>
        <div class="stream-embed-wrapper">
          <div class="stream-embed">
            <iframe
              src="https://embed.twitch.tv?channel=morrolantv&amp;height=100%25&amp;migration=true&amp;parent=localhost&amp;parent=sirfilior-dev.com&amp;referrer=http%3A%2F%2Flocalhost%3A3000%2Fstream&amp;theme=dark&amp;width=100%25"
              allowfullscreen=""
              scrolling="no"
              allow="autoplay; fullscreen"
              title="Twitch"
              width="100%"
              height="100%"
              frameborder="0"
            ></iframe>
          </div>
        </div>
        <div class="stream-functions-wrapper is-flex">
          <div class="toggle-function-wrapper mr-3">
            <div class="chat-commands-toggle">
              <button class="button is-secondary" @click="openCommands">
                Toggle chat commands
              </button>
            </div>
            <div class="function-window" :class="{ isOpen: isOpen }">
              <ul>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
                <li>!test</li>
              </ul>
            </div>
          </div>
          <div class="toggle-function-wrapper">
            <div class="schedule-toggle">
              <button class="button is-secondary" @click="toggleSchedule">
                Toggle schedule
              </button>
            </div>
            <div
              class="function-window"
              :class="{ scheduleOpen: scheduleOpen }"
            >
              <ul>
                <li>Monday: No stream</li>
                <li>Tuesday: Start - 1 PM</li>
                <li>Wednesday: Start - 1 PM</li>
                <li>Thursday: Start - 1 PM</li>
                <li>Friday: Start - 1 PM</li>
                <li>Saturday: Start - 1 PM</li>
                <li>Sunday: No stream</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section content lighter last">
      <div class="container">
        <div class="section-title is-flex justify-between">
          <h2 class="title mb-0 is-2">Leaderboards</h2>
        </div>
        <div class="leaderboards-wrapper columns">
          <div class="leaderboards column is-third">
            <h3 class="title is-5">DONATIONS</h3>
            <div v-if="donationsLoading" class="loader"></div>
            <div v-else>
              <div class="user-list">
                <div
                  v-for="entry of donationList"
                  :key="entry.username"
                  class="leaderboard-entry"
                >
                  <span class="leaderboard-username">{{ entry.username }}</span>
                  <span class="leaderboard-amount"
                    >{{ Math.ceil(entry.total) }} $</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="leaderboards column is-third">
            <h3 class="title is-5">BITS</h3>
            <div v-if="bitsLoading" class="loader"></div>
            <div v-else>
              <div class="user-list">
                <div
                  v-for="entry of bitsList"
                  :key="entry.user_name"
                  class="leaderboard-entry"
                >
                  <span class="leaderboard-username">{{
                    entry.user_name
                  }}</span>
                  <span class="leaderboard-amount">{{ entry.score }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="leaderboards column is-third">
            <h3 class="title is-5">SUBS</h3>
            <div v-if="subsLoading" class="loader"></div>
            <div v-else>
              <div class="user-list">
                <div
                  v-for="entry of donationList"
                  :key="entry.username"
                  class="leaderboard-entry"
                >
                  <span class="leaderboard-username">{{ entry.username }}</span>
                  <span class="leaderboard-amount"
                    >{{ entry.total.toFixed(2) }} $</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  data() {
    return {
      heroimg: 'tools',
      isOpen: false,
      scheduleOpen: false,
      donationList: [],
      bitsList: [],
      subsList: [],
      donationsLoading: true,
      bitsLoading: true,
      subsLoading: true,
    }
  },
  computed: {},
  mounted() {
    this.donationsLoading = true
    this.bitsLoading = true
    this.subsLoading = true
    this.$axios.$get('/twitch/donations').then((res) => {
      this.donationList = res.sort((a, b) => b.total - a.total)
      this.donationsLoading = false
    })
    this.$axios.$get('/twitch/bits').then((res) => {
      this.bitsList = res.map((x) => x._data)
      this.bitsLoading = false
    })
  },
  methods: {
    openCommands() {
      this.isOpen = !this.isOpen
      if (this.isOpen) this.scheduleOpen = false
    },
    toggleSchedule() {
      this.scheduleOpen = !this.scheduleOpen
      if (this.scheduleOpen) this.isOpen = false
    },
  },
}
</script>
<style lang="scss">
.stream-embed-wrapper {
  position: relative;
  min-height: 745px;
}
.stream-embed {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.toggle-function-wrapper {
  display: flex;
  margin-top: 20px;
  position: relative;
}
.function-window {
  position: absolute;
  bottom: 45px;
  height: 0;
  overflow: hidden;
  min-width: 340px;
  &.isOpen,
  &.scheduleOpen {
    height: auto;
  }
  ul {
    padding: 20px;
    background: rgba(18, 23, 28, 0.9);
    width: 100%;
  }
}
.stat-switcher {
  display: flex;
  justify-content: flex-end;
  button {
    display: block;
    margin-right: 10px;
  }
}

.leaderboards {
  .user-list {
    background: $grey-blue;
    padding: 20px;
    max-height: 710px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: $blue $black-bis;
    ::-webkit-scrollbar {
      width: 15px;
    }
    ::-webkit-scrollbar-track {
      background: $black-bis;
    }
    ::-webkit-scrollbar-thumb {
      background-color: $blue;
      border: 1px solid $black-bis;
    }
  }
}

.leaderboard-entry {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
  &:nth-child(-n + 3) {
    padding: 20px;
    margin-bottom: 20px;
  }
}
.leaderboard-entry:nth-child(1) {
  border: 7px double $yellow;
  font-weight: bold;
}
.leaderboard-entry:nth-child(2) {
  border: 4px solid $grey;
}
.leaderboard-entry:nth-child(3) {
  border: 2px solid $blue;
}

.leaderboard-username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70%;
}
</style>
