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
          external: true,
          path:
            'https://www.twitch.tv/collections/VCa69D8d_hTkzw?filter=collections',
        },
        {
          name: 'Sekiro: Shadows Die Twice',
          type: 'YouTube',
          desc: '',
          image: 'sekiro',
          external: true,
          path:
            'https://www.twitch.tv/collections/7zke3Si9kRU6Lg?filter=collections',
        },
        {
          name: 'Final Fantasy VII Remake',
          type: 'VOD',
          desc: '',
          image: 'finalfantasy',
          external: true,
          path:
            'https://www.twitch.tv/collections/3W_kgujrBRb3Ww?filter=collections',
        },
        {
          name: 'Dark Souls',
          type: 'VOD',
          desc: '',
          image: 'darksouls',
          external: true,
          path:
            'https://www.twitch.tv/collections/kIvUH9k7NBWslw?filter=collections',
        },
      ],
    }
  },
}
</script>

<style></style>
