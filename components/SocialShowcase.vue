<template>
  <div class="social-wrapper">
    <div><h3 class="title is-3 mb-3">Social Media</h3></div>
    <div>
      <h5 class="subtitle is-5 mb-2">
        Stay connected, check out MorrolanTV on his channels
      </h5>
    </div>
    <div class="social">
      <a
        id="youtube"
        href="https://youtube.com/morrolantv"
        target="_blank"
        class="social"
      >
        <fa :icon="['fab', 'youtube']" />
      </a>
      <a
        id="discord"
        href="https://discord.gg/morrolantv"
        target="_blank"
        class="social"
      >
        <fa :icon="['fab', 'discord']" />
      </a>
      <a
        id="twitter"
        href="https://twitter.com/Morrolantv"
        target="_blank"
        class="social"
      >
        <fa :icon="['fab', 'twitter']" />
      </a>
    </div>
  </div>
</template>
<style lang="scss">
.social-wrapper {
  background: $blue;
  padding: 20px;
  transition: 1s;
  box-shadow: purpleBoxShadow(8, true);
}

@include layoutScrolled {
  .social-wrapper {
    transform: translateY(-50px);
  }
}

.social {
  display: flex;
  a {
    margin-top: 10px;
    margin-right: 20px;
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    font-size: 20px;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    &#youtube {
      background: linear-gradient(90deg, #e71414, #ff3232);
    }
    &#discord {
      background: linear-gradient(90deg, #7289da, #86a1ff);
    }
    &#twitter {
      background: linear-gradient(90deg, #1dcaff, #6cddff);
    }
  }
}
</style>
