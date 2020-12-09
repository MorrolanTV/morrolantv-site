<template>
  <main>
    <section class="section no-hero lighter">
      <div class="container">
        <h1 class="title is-1">Morrolan.tv</h1>
        <h3 class="title is-3">Info</h3>
        <p class="mb-6">
          Thank you for visiting morrolan.tv! As you can see, an enormous amount
          of work has gone into this project, and many more updates are planned
          for the future. If you find this site to be useful and you want to
          help us create more tools, please consider checking out a sponsor or
          donating directly.
        </p>
        <h3 class="title is-3">Sponsors</h3>
        <div class="sponsors-wrapper is-flex align-center flex-wrap">
          <div class="mb-5">
            <a target="_blank" href="https://advanced.gg/?ref=MORROLANTV"
              ><img :src="require('~/assets/img/focus.jpg')"
            /></a>
            <p class="mt-5">
              Focus by Advanced is 0 calorie, sugar free energy drink that I use
              every day. There are three main reasons why I use Focus instead of
              the dozens of other energy drink options: 1) Drinking a ton of
              caffeine often made me jittery or anxious. Focus contains
              L-Theanine, an amino acid found in tea, which combines with
              caffeine to give you the same energy and alertness but without any
              jitters. HUGE difference, I will never drink an energy drink
              without L-Theanine ever again. 2) Most energy drinks are a
              combination of caffeine & vitamins, which is fine. Focus takes it
              a step further with a blend of nootropics which have been
              clinically proven to do things like boost memory, improve reaction
              speed, and help your eyes recover from long periods of staring at
              a screen. 3) Lots of these drinks have chalky textures, especially
              once you get to the bottom of the shaker. Focus is less bulky and
              blends nicely into water without that chalkiness.
            </p>
          </div>
          <div class="mb-5">
            <a target="_blank" href="https://streamelements.com/morrolantv/tip"
              ><img :src="require('~/assets/img/donate.png')"
            /></a>
            <p class="mt-5">
              This is the Donate link from my Twitch page. If I'm live, any
              donations above 2 dollars will show up on stream with your
              username and a text-to-speech notification of your message. Top
              supporters are also listed on the Donation leaderboard found here:
              <a class="mb-5" href="https://www.morrolan.tv/stream"
                >https://www.morrolan.tv/stream</a
              >
            </p>
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
