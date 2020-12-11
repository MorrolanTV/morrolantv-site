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
        <div class="mb-5">
          <a target="_blank" href="https://streamelements.com/morrolantv/tip"
            ><img :src="require('~/assets/img/donate.png')"
          /></a>
          <p class="mt-5">
            This is the
            <a href="https://streamelements.com/morrolantv/tip">Donate link</a>
            from my Twitch page. If I'm live, any donations above 2 dollars will
            show up on stream with your username and a text-to-speech
            notification of your message. Top supporters are also listed on the
            Donation leaderboard found here:
            <a class="mb-5" href="https://www.morrolan.tv/stream"
              >https://www.morrolan.tv/stream</a
            >
          </p>
        </div>
        <h3 class="title is-3">Sponsors</h3>
        <div class="sponsors-wrapper is-flex align-center flex-wrap">
          <div class="mb-5">
            <a target="_blank" href="https://advanced.gg/?ref=MORROLANTV"
              ><img :src="require('~/assets/img/focus.jpg')"
            /></a>
            <p class="mt-5">
              Focus by Advanced is 0 calorie, sugar free energy drink that I use
              every day. There are three main reasons why I use Focus instead of
              the dozens of other energy drink options:<br /><br />
              1) Drinking a ton of caffeine often made me jittery or anxious.
              Focus contains L-Theanine, an amino acid found in tea, which
              combines with caffeine to give you the same energy and alertness
              but without any jitters. HUGE difference, I will never drink an
              energy drink without L-Theanine ever again.<br /><br />
              2) Most energy drinks are a combination of caffeine & vitamins,
              which is fine. Focus takes it a step further with a blend of
              nootropics which have been clinically proven to do things like
              boost memory, improve reaction speed, and help your eyes recover
              from long periods of staring at a screen.<br /><br />
              3) Lots of these drinks have chalky textures, especially once you
              get to the bottom of the shaker. Focus is less bulky and blends
              nicely into water without that chalkiness.
            </p>
          </div>
          <div class="mb-5">
            <a target="_blank" href="https://advanced.gg/?ref=MORROLANTV"
              ><img
                style="max-width: 320px"
                :src="require('~/assets/img/chill.jpg')"
            /></a>
            <p class="mt-5">
              Advanced also has a caffeine-free CBD drink called Chill which
              took me totally by surprise. I was never much of a CBD person, but
              they sent me some to try, and I was amazed at how well it works to
              help me de-stress and relax at the end of a long day. Don't just
              take my word for it - ask in Twitch chat or Discord, and you will
              find lots of people with great things to say about this product.
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
