<template>
  <ContentBoxes
    anchor="gamecollections"
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
          name: 'Node Calculator',
          type: 'YouTube',
          desc: '',
          image: 'bloodborne',
          path: '/',
        },
        {
          name: 'Node Calculator',
          type: 'VOD',
          desc: '',
          image: 'bloodborne',
          path: '/',
        },
        {
          name: 'Node Calculator',
          type: 'VOD',
          desc: '',
          image: 'bloodborne',
          path: '/',
        },
      ],
    }
  },
}
</script>

<style></style>
