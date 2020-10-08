<template>
  <main>
    <section class="section no-hero lighter">
      <div class="container">
        <h1 class="title is-1">About Morrolan</h1>
        <h3 class="title is-3">Info</h3>
        <p class="mb-6">
          Online gaming started for me in 1996 with Warcraft II as a trash
          talking eight year old. From there I discovered MMOs in 1997, most
          notably sandbox MMOs such as Ultima Online and Darkfall. My current
          favorite MMO is Black Desert, which is the primary focus of the
          stream, though I also stream a variety of single player RPGs. You can
          see more about the games I play down below under the Schedule tab.
        </p>
        <h3 class="title is-3">Sponsors</h3>
        <div class="sponsors-wrapper is-flex align-center flex-wrap">
          <div class="sponsor-element mr-5">
            <a target="_blank" href="http://nopi.ng/morrolantv"
              ><img :src="require('~/assets/img/noping.png')"
            /></a>
          </div>
          <div class="sponsor-element">
            <a target="_blank" href="https://advanced.gg/?ref=MORROLANTV"
              ><img :src="require('~/assets/img/focus.jpg')"
            /></a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
