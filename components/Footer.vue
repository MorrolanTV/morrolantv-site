<template>
  <footer class="section">
    <div class="container">
      <div class="footer-content columns">
        <div class="footer-col column">
          <h6 class="subtitle is-6">Socials</h6>
          <div class="is-flex footer-social-icons">
            <div class="mr-5">
              <a>
                <fa :icon="['fab', 'twitch']" /><span class="ml-2"
                  >Twitch</span
                ></a
              >
              <a>
                <fa :icon="['fab', 'discord']" /><span class="ml-2"
                  >Discord</span
                ></a
              >
            </div>
            <div>
              <a>
                <fa :icon="['fab', 'youtube']" /><span class="ml-2"
                  >YouTube</span
                ></a
              >
              <a>
                <fa :icon="['fab', 'twitter']" /><span class="ml-2"
                  >Twitter</span
                ></a
              >
            </div>
          </div>
        </div>
        <div class="footer-col column">
          <h6 class="subtitle is-6">Contact</h6>
          <p>contact@morrolan.tv</p>
          <p>MorrolanTV#1111</p>
        </div>
        <div class="footer-col column">
          <h6 class="subtitle is-6">Legal</h6>
          <a>Terms of Use</a>
          <a>Cookies</a>
          <a>Privacy</a>
        </div>
        <div class="footer-col column">
          <h6 class="subtitle is-6">Information</h6>
          <p>Site Copyright @ 2020 MorrolanTV</p>
          <p>Game Media belongs to the respective publisher</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
footer {
  border-top: 8px solid $border-accent;
  background: $background-footer;
}
.footer-content {
  padding: 40px 0;
  @media (max-width: 718px) {
    padding: 20px 0;
    text-align: center;
    .footer-social-icons {
      justify-content: center;
    }
  }
}
.footer-col {
  a,
  p {
    display: block;
    margin-bottom: 15px;
  }
}
</style>
