<template>
  <div class="google-map">
    <div class="google-map-container">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GoogleMap } from '~/google/GoogleMap'

export default {
  name: 'GoogleMap',
  computed: {
    ...mapState([
      'activeInfoWindow',
      'triggerInfoWindow'
    ])
  },
  data() {
    return {
      map: null,
    }
  },
  watch: {
    triggerInfoWindow() {
      this.handleMarker(this.activeInfoWindow)
    }
  },
  mounted() {
    this.map = new GoogleMap('.google-map-container', this.getPlaces)
    this.map
      .init()
      .then(() => {
        this.map.setMarkers()
      })
  },
  methods: {
    handleMarker(id) {
      this.map.handleClickMarker(id)
    }
  },
}
</script>

<style lang="scss">
.google-map {
  margin-bottom: 40px;
}
.google-map-container {
  height: 400px;
  width: 100%;
}
</style>
