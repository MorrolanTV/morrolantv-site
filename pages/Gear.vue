<template>
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
                <img :src="require('~/assets/img/gear/Armor1.PNG')" />
                <p>Stacks: {{ getItemInfo('Helmet').stacks }}</p>
                <p>Attempts: {{ getItemInfo('Helmet').attempts }}</p>
              </div>
              <div class="itemimg-wrapper">
                <img :src="require('~/assets/img/gear/Armor1.PNG')" />
                <p>Stacks: {{ getItemInfo('Armor').stacks }}</p>
                <p>Attempts: {{ getItemInfo('Armor').attempts }}</p>
              </div>
            </div>
            <div>
              <div class="itemimg-wrapper mb-2">
                <img :src="require('~/assets/img/gear/Gear.PNG')" />
              </div>
            </div>
            <div>
              <div class="itemimg-wrapper mb-2">
                <img :src="require('~/assets/img/gear/Armor1.PNG')" />
                <p>Stacks: {{ getItemInfo('Gloves').stacks }}</p>
                <p>Attempts: {{ getItemInfo('Gloves').attempts }}</p>
              </div>
              <div class="itemimg-wrapper">
                <img :src="require('~/assets/img/gear/Armor1.PNG')" />
                <p>Stacks: {{ getItemInfo('Boots').stacks }}</p>
                <p>Attempts: {{ getItemInfo('Boots').attempts }}</p>
              </div>
            </div>
          </div>
          <div class="weapons-wrapper is-flex justify-center">
            <div class="itemimg-wrapper mr-2">
              <img :src="require('~/assets/img/gear/Weapon1.PNG')" />
              <p>Stacks: {{ getItemInfo('Weapon').stacks }}</p>
              <p>Attempts: {{ getItemInfo('Weapon').attempts }}</p>
            </div>
            <div class="itemimg-wrapper mr-2">
              <img :src="require('~/assets/img/gear/Weapon1.PNG')" />
              <p>Stacks: {{ getItemInfo('Awaken').stacks }}</p>
              <p>Attempts: {{ getItemInfo('Awaken').attempts }}</p>
            </div>
            <div class="itemimg-wrapper">
              <img :src="require('~/assets/img/gear/Weapon1.PNG')" />
              <p>Stacks: {{ getItemInfo('Offhand').stacks }}</p>
              <p>Attempts: {{ getItemInfo('Offhand').attempts }}</p>
            </div>
          </div>
        </div>
        <div class="gear-section">
          <div class="values-wrapper">
            <div v-for="value of valueList" :key="value.name" class="valueinfo">
              <span class="uppercase mr-3">{{ value.name }}</span
              ><span>{{ value.value }}</span>
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
              <img :src="require('~/assets/img/gear/Lifeskill.PNG')" />
            </div>
            <div>
              <img :src="require('~/assets/img/gear/LifeskillGear.PNG')" />
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
</template>
<script>
export default {
  data() {
    return {
      heroimg: 'tools',
      collecection: [
        {
          name: 'Weapon',
          stacks: '192',
          attempts: '23',
        },
        {
          name: 'Offhand',
          stacks: '192',
          attempts: '23',
        },
        {
          name: 'Awaken',
          stacks: '192',
          attempts: '23',
        },
        {
          name: 'Helmet',
          stacks: '192',
          attempts: '23',
        },
        {
          name: 'Armor',
          stacks: '192',
          attempts: '23',
        },
        {
          name: 'Gloves',
          stacks: '192',
          attempts: '23',
        },
        {
          name: 'Boots',
          stacks: '192',
          attempts: '23',
        },
        {
          name: 'Pen Weapon Attempts:',
          value: '1/23',
        },
        {
          name: 'Pen Armor Attempts:',
          value: '4/46',
        },
        {
          name: 'TET Accessory Attempts:',
          value: '1/23',
        },
        {
          name: 'Combat Gear Value:',
          value: '150 Billion',
        },
        {
          name: 'Lifeskill Gear Value:',
          value: '30 Billion',
        },
        {
          name: 'Storage Value:',
          value: '15 Billion',
        },
        {
          name: 'Horse Value:',
          value: '12 Billion',
        },
        {
          name: 'Net Worth:',
          value: '207 Billion',
        },
      ],
    }
  },
  computed: {
    canEdit() {
      return (
        this.$auth.user &&
        this.$auth.user.sub === 'google-oauth2|117323980375187460896'
      )
    },
    valueList() {
      return this.collecection.filter((item) => item.value)
    },
  },
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
