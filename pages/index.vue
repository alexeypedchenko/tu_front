<template>
  <div class="home">
    <div class="container">
      <app-fltr />

      <place-preview-list />
    </div>

    <google-map class="home__map" />
  </div>
</template>

<script>
import GoogleMap from '~/components/google/GoogleMap'
import PlacePreviewList from '~/components/places/PlacePreviewList'
import Fltr from '~/components/fltr/Fltr'

export default {
  components: {
    GoogleMap,
    PlacePreviewList,
    AppFltr: Fltr,
  },
}
</script>

<style lang="scss">
.home {
  display: flex;
  align-items: stretch;
}
.home__map {
  width: 80%;
}
</style>
