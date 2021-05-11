<template>
  <div class="google-map">
    <div class="google-map__centred-btn" @click="centeredMap">
      Центрировать карту
    </div>
    <div class="google-map__container">
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
    this.map = new GoogleMap('.google-map__container', this.getPlaces)
    this.map
      .init()
      .then(() => {
        this.map.setMarkers()
      })
  },
  methods: {
    handleMarker(id) {
      this.map.handleClickMarker(id)
    },
    centeredMap() {
      this.map.centeredMap()
    }
  },
}
</script>

<style lang="scss">
.google-map {
  // margin-bottom: 40px;
  position: relative;
}
.google-map__centred-btn {
  position: absolute;
  top: 10px;
  right: 60px;
  height: 40px;
  z-index: 1;
  background: #fff;
  font-size: 12px;
  padding: 0 10px;
  line-height: 40px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  text-align: center;
  cursor: pointer;
  color: rgba(#000, 0.75);
  transition: 0.3s;
  &:hover {
    color: #000;
  }
}
.google-map__container {
  height: 400px;
  width: 100%;
}
</style>
