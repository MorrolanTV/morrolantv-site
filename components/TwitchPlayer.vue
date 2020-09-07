<template>
  <div class="tw-wrapper">
    <iframe
      src="https://player.twitch.tv/?channel=morrolantv&parent=morrolantv-dev.herokuapp.com&parent=localhost"
      frameborder="0"
      allowfullscreen="false"
      scrolling="no"
      height="100%"
      width="100%"
    ></iframe>
  </div>
</template>
<style lang="scss">
.tw-wrapper {
  background: $blue;
  transition: 1s;
  box-shadow: purpleBoxShadow(8, false);
  height: 300px;
  iframe {
    height: 100%;
  }
}
</style>
