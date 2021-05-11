<template>
  <div class="home">
    <div class="container">
      <h1>
        Hello TU!
      </h1>

      <place-preview />
    </div>

    <google-map />
  </div>
</template>

<script>
import GoogleMap from '~/components/GoogleMap'
import PlacePreview from '~/components/places/PlacePreview'
export default {
  components: {
    GoogleMap,
    PlacePreview,
  },
}
</script>

<style lang="scss">
.home {
  h1 {
    margin-bottom: 40px;
  }
}
</style>
