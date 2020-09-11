<template>
  <section :id="anchor" class="section content" :class="sectionClass">
    <div class="container">
      <div class="section-title">
        <h2 class="title is-2">{{ title }}</h2>
      </div>
      <div :class="gridClass">
        <div v-for="content in entries" :key="content.name" class="content-box">
          <nuxt-link v-if="!content.external" :to="content.path">
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
              <h4 class="is-4 subtitle has-lineupper">{{ content.name }}</h4>
              <div v-if="content.desc" class="desc-wrapper">
                <p>{{ content.desc }}</p>
              </div>
            </div>
          </nuxt-link>
          <a v-else :href="content.path" target="_blank">
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
              <h4 class="is-4 subtitle has-lineupper">{{ content.name }}</h4>
              <div v-if="content.desc" class="desc-wrapper">
                <p>{{ content.desc }}</p>
              </div>
            </div>
          </a>
        </div>
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
    sectionClass: {
      type: String,
      default: '',
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
  transition: 0.3s;
  position: relative;

  a {
    display: block;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .image-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    picture,
    img {
      min-height: 100%;
      min-width: 100%;
    }
  }

  &:hover {
    z-index: 2;
    box-shadow: 0 60px 90px -40px rgba(0, 0, 0, 0.6);
  }

  .content {
    z-index: 2;
    .subtitle,
    p {
      margin-bottom: 0;
    }
  }
  .desc-wrapper {
    max-height: 0;
    transition: 0.3s;
    overflow: hidden;
  }
  &:hover {
    .desc-wrapper {
      max-height: 50px;
    }
  }
}
</style>
