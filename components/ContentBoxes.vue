<template>
  <section :id="anchor" class="section">
    <div class="container">
      <div class="section-title">
        <h2 class="title is-2">{{ title }}</h2>
      </div>
      <div :class="gridClass">
        <a
          v-for="content in entries"
          :key="content.name"
          :href="content.path"
          class="content-box"
        >
          <div class="image-wrapper">
            <picture>
              <source
                :srcset="require(`~/assets/img/webp/${content.image}.webp`)"
                type="image/webp"
              />
              <source
                :srcset="require(`~/assets/img/webp/${content.image}.jpg`)"
                type="image/jpeg"
              />
              <img
                :src="require(`~/assets/img/webp/${content.image}.jpg`)"
                alt="Alt Text!"
              />
            </picture>
          </div>
          <div class="content px-4 py-5">
            <h4 class="subtitle is-4 has-lineupper">{{ content.name }}</h4>
            <div v-if="content.desc" class="desc-wrapper">
              <p>{{ content.desc }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    anchor: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      default: '100',
      required: true,
    },
    gridClass: {
      type: String,
      default: 'equal-container',
      required: false,
    },
    entries: {
      type: Array,
      default: null,
      required: true,
    },
  },
}
</script>
<style lang="scss">
.equal-container {
  display: grid;
  @include desktop {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 500px;
    gap: 20px;
  }
}
.content-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-repeat: no-repeat;
  transition: 0.3s;
  position: relative;

  .image-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    z-index: 1;
    picture,
    img {
      height: 100%;
      width: auto;
    }
  }

  &:hover {
    z-index: 2;
    transform: translateY(-2px);
    box-shadow: 0 60px 90px -40px rgba(0, 0, 0, 0.6);
  }

  .content {
    z-index: 2;
  }

  .desc-wrapper {
  }
}
</style>
