<template>
  <ContentBoxes
    anchor="highlight"
    section-class="section content lighter last"
    title="Content Highlights"
    :entries="games"
  />
</template>
<script>
export default {
  data() {
    return {
      games: [
        {
          name: 'Bloodborne',
          type: 'VOD',
          desc: '',
          image: 'bloodborne',
          path: 'https://www.google.ch',
        },
        {
          name: 'Sekiro: Shadows Die Twice',
          type: 'YouTube',
          desc: '',
          image: 'sekiro',
          path: '/',
        },
        {
          name: 'Final Fantasy VII Remake',
          type: 'VOD',
          desc: '',
          image: 'finalfantasy',
          path: '/',
        },
        {
          name: 'Dark Souls',
          type: 'VOD',
          desc: '',
          image: 'darksouls',
          path: '/',
        },
      ],
    }
  },
}
</script>

<style></style>
