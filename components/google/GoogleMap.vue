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
    },
    route: {
      type: Array,
      default: () => ([])
    },
    showRoute: {
      type: Boolean,
      default: false,
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
      prewInfoWinfow: null,
    }
  },
  watch: {
    items(afterData, beforeData) {
      if (JSON.stringify(afterData) !== JSON.stringify(beforeData)) {
        this.drawMapData()
      }
    },
    route(afterData, beforeData) {
      if (JSON.stringify(afterData) !== JSON.stringify(beforeData)) {
        this.drawRoute()
      }
    },
    triggerInfoWindow(afterData, beforeData) {
      if (this.prewInfoWinfow === this.activeInfoWindow) {
        this.prewInfoWinfow = null
        this.map.centeredMap()
      } else {
        this.prewInfoWinfow = this.activeInfoWindow
      }
      this.handleMarker(this.activeInfoWindow)
    },
    hoveredMarker(afterData, beforeData) {
      if (this.hoveredMarker) {
        this.map.handleCreateMarker(this.hoveredMarker)
      } else {
        this.map.removeLastMarker()
      }
    },
    'map.hoveredMarkerIndex'(afterData, beforeData) {
      this.$store.commit('map/setHoveredMarkerIndex', afterData)
    },
  },
  mounted() {
    this.map = new GoogleMap('.google-map__container', this.pin)
    this.map
      .init()
      .then(() => {
        this.$store.commit('map/mapInit')
        this.drawMapData()
        this.drawRoute()
      })
  },
  methods: {
    handleMarker(id) {
      if (this.map) {
        this.map.handleClickMarker(id)
      }
    },
    centeredMap() {
      if (this.map) {
        this.map.centeredMap()
      }
    },
    drawMapData() {
      this.map.setMarkers(this.items)
      if (this.showRoute) {
        this.map.route.draw(this.items)
      }
    },
    drawRoute() {
      if (this.route.length) {
        this.map.route.clear()
        this.map.route.draw(this.route)
      }
    }
  },
  destroy() {
    this.$store.commit('map/mapDestroy')
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
