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
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapState('map', [
      'activeInfoWindow',
      'triggerInfoWindow',
      'hoveredMarker'
    ]),
  },
  data() {
    return {
      map: null,
      pin: '/icons/pin.svg',
    }
  },
  watch: {
    items(afterData, beforeData) {
      if (JSON.stringify(afterData) !== JSON.stringify(beforeData)) {
        this.map.setMarkers(this.items)
      }
    },
    triggerInfoWindow() {
      this.handleMarker(this.activeInfoWindow)
    },
    hoveredMarker(afterData, beforeData) {
      if (this.hoveredMarker) {
        this.map.handleCreateMarker(this.hoveredMarker)
      } else {
        this.map.removeLastMarker()
      }
    }
  },
  mounted() {
    this.map = new GoogleMap('.google-map__container', this.pin)
    this.map
      .init()
      .then(() => {
        this.map.setMarkers(this.items)
      })
  },
  methods: {
    handleMarker(id) {
      this.map.handleClickMarker(id)
    },
    centeredMap() {
      this.map.centeredMap()
    },
  },
}
</script>

<style lang="scss">
.google-map {
  margin-bottom: 40px;
  position: relative;
  height: 100%;
  width: 100%;
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
  min-height: 600px;
  height: 100%;
  width: 100%;
}
.custom-label-class {
  padding: 2px 4px;
  background: #fff;
}
</style>
