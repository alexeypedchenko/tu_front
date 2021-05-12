<template>
  <div class="home">
    <div class="container">
      <h1>
        Hello TU!
      </h1>

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
  h1 {
    margin-bottom: 40px;
  }
  display: flex;
  align-items: stretch;
}
.home__map {
  width: 50%;
}
</style>
