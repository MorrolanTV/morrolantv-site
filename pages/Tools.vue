<template>
  <main>
    <section class="hero subpage w-100">
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
            style="top: -100%"
            alt="Alt Text!"
          />
        </picture>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Black Desert Online Tools</h1>
        <nuxt-link
          v-for="tool in tools"
          :key="tool.name"
          :to="tool.path"
          class="columns tool"
        >
          <div class="column">
            <div class="tool-content">
              <h3 class="title is-3">{{ tool.name }}</h3>
              <h5 class="subtitle is-5">{{ tool.desc }}</h5>
              <p>{{ tool.long }}</p>
            </div>
          </div>
          <div class="column is-one-fifth">
            <div class="toolimg-wrapper">
              <div class="image-container">
                <picture>
                  <source
                    :srcset="require(`~/assets/img/webp/${tool.image}.webp`)"
                    type="image/webp"
                  />
                  <source
                    :srcset="require(`~/assets/img/webp/${tool.image}.jpg`)"
                    type="image/jpeg"
                  />
                  <img
                    class="image"
                    :src="require(`~/assets/img/webp/${tool.image}.jpg`)"
                    alt="Alt Text!"
                  />
                </picture>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </section>
  </main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      heroimg: 'tools',
    }
  },
  computed: mapState(['tools']),
}
</script>
<style lang="scss" scoped>
.tool {
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: translateX(20px);
  }
}
.tool-content {
  background: $blue;
  height: 100%;
  padding: 20px;
}
.toolimg-wrapper {
  height: 180px;
  overflow: hidden;
}
.image-container {
  height: 100%;
  display: flex;
  align-items: center;
}
img {
  height: auto;
  width: 100%;
}
</style>
