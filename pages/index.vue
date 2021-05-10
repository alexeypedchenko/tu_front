<template>
  <div class="home">
    <div class="container">
      <h1>
        Hello TU!
      </h1>

      <place-preview />

      <google-map />
    </div>
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
  padding-top: 20px;
  h1 {
    margin-bottom: 40px;
  }
}
</style>
