<template>
  <div v-if="$fetchState.pending">
    <main>
      <section class="section no-hero">
        <div class="container">
          <div class="loader"></div>
        </div>
      </section>
    </main>
  </div>
  <div v-else-if="$fetchState.error">
    <main>
      <section class="section no-hero">
        <div class="container">
          <div class="error-wrapper">
            <div class="error">
              <h3 class="title">API ERROR</h3>
              <h5 class="subtitle">COULD NOT FETCH DATA</h5>
              <p>Our API is having trouble at the moment, check back later.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <div v-else>
    <main>
      <section class="section no-hero">
        <div class="container gear-container">
          <h1 class="title is-1">Black Desert Collection</h1>
          <client-only>
            <div v-if="canEdit" class="gear-section">
              <GearEdit :info="collecection" />
            </div>
          </client-only>
          <div class="mb-3">
            <h3 class="title is-3">Overview</h3>
            <div class="equipement-wrapper is-flex justify-around">
              <div>
                <div class="itemimg-wrapper mb-2">
                  <img :src="baseImgUrl + '/images/gear/Helmet.PNG'" />
                  <p>Stacks: {{ getItemInfo('Helmet').stacks }}</p>
                  <p>Attempts: {{ getItemInfo('Helmet').attempts }}</p>
                </div>
                <div class="itemimg-wrapper">
                  <img :src="baseImgUrl + '/images/gear/Armor.PNG'" />
                  <p>Stacks: {{ getItemInfo('Armor').stacks }}</p>
                  <p>Attempts: {{ getItemInfo('Armor').attempts }}</p>
                </div>
              </div>
              <div>
                <div class="itemimg-wrapper mb-2">
                  <img :src="baseImgUrl + '/images/gear/Gear.PNG'" />
                </div>
              </div>
              <div>
                <div class="itemimg-wrapper mb-2">
                  <img :src="baseImgUrl + '/images/gear/Gloves.PNG'" />
                  <p>Stacks: {{ getItemInfo('Gloves').stacks }}</p>
                  <p>Attempts: {{ getItemInfo('Gloves').attempts }}</p>
                </div>
                <div class="itemimg-wrapper">
                  <img :src="baseImgUrl + '/images/gear/Boots.PNG'" />
                  <p>Stacks: {{ getItemInfo('Boots').stacks }}</p>
                  <p>Attempts: {{ getItemInfo('Boots').attempts }}</p>
                </div>
              </div>
            </div>
            <div
              class="weapons-wrapper is-flex justify-center"
              style="align-items: flex-end"
            >
              <div class="itemimg-wrapper mr-2">
                <img :src="baseImgUrl + '/images/gear/Weapon.PNG'" />
                <p>Stacks: {{ getItemInfo('Weapon').stacks }}</p>
                <p>Attempts: {{ getItemInfo('Weapon').attempts }}</p>
              </div>
              <div class="itemimg-wrapper mr-2">
                <img :src="baseImgUrl + '/images/gear/Awaken.PNG'" />
                <p>Stacks: {{ getItemInfo('Awaken').stacks }}</p>
                <p>Attempts: {{ getItemInfo('Awaken').attempts }}</p>
              </div>
              <div class="itemimg-wrapper">
                <img :src="baseImgUrl + '/images/gear/Offhand.PNG'" />
                <p>Stacks: {{ getItemInfo('Offhand').stacks }}</p>
                <p>Attempts: {{ getItemInfo('Offhand').attempts }}</p>
              </div>
            </div>
          </div>
          <div class="gear-section">
            <div class="values-wrapper">
              <div
                v-for="(value, index) of valueList"
                :key="value.name"
                class="valueinfo"
              >
                <span class="uppercase mr-3">{{ value.name }}</span
                ><span>{{ value.value }}</span>
                <span>
                  <fa
                    v-if="index == valueList.length - 1"
                    :icon="['fas', 'coins']"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section content lighter last">
        <div class="container gear-container">
          <div class="gear-section">
            <h3 class="title is-3">Lifeskills</h3>
            <div class="screenshot-wrapper">
              <div>
                <img :src="baseImgUrl + '/images/gear/Lifeskill.PNG'" />
              </div>
              <div>
                <img :src="baseImgUrl + '/images/gear/LifeskillGear.PNG'" />
              </div>
            </div>
          </div>
          <div class="gear-section">
            <h3 class="title is-3">Other</h3>
            <p>Insert horse, boat and knowledge image</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
export default {
  async fetch() {
    // Fetch default node data
    const collection = await this.$axios.$get('/gear/text').then((res) => res)
    if (collection) {
      this.collecection = collection
    }
  },
  data() {
    return {
      heroimg: 'tools',
      collecection: [],
    }
  },
  computed: {
    canEdit() {
      return (
        this.$auth.user &&
        this.$auth.user.sub === 'google-oauth2|117323980375187460896'
      )
    },
    baseImgUrl() {
      return this.$axios.defaults.baseURL
    },
    valueList() {
      return this.collecection.filter((item) => item.value)
    },
  },
  fetchOnServer: false,
  methods: {
    getItemInfo(name) {
      return this.collecection.find((item) => item.name === name)
    },
  },
}
</script>
<style lang="scss" scoped>
.valueinfo {
  font-size: 18px;
  &:last-child {
    font-weight: bold;
  }
}
.gear-container {
  text-align: center;
}
.gear-section {
  margin-bottom: 60px;
}
</style>
