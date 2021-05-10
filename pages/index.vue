<template>
  <div class="home">
    <div class="container">
      <h1>
        Hello TU!
      </h1>

      <div
        class="place"
        v-for="place in getPlaces"
        :key="place.id"
      >
        <h3 class="place-name">
          {{ place.name }}
        </h3>
        <button class="btn" @click="$router.push(`/place/${place.id}`)">
          go to {{ place.name }}
        </button>
      </div>

      <div ref="map" class="map"></div>
    </div>
  </div>
</template>

<script>
import { GoogleMap } from '~/google/GoogleMap'
export default {
  mounted() {
    // console.log('this.getPlaces:', this.getPlaces)
    const map = new GoogleMap('.map')
    map
      .init()
      .then(() => {
        // map.setMarker()
        map.setMarkers()
      })
  }
}
</script>

<style lang="scss">
.home {
  padding-top: 20px;
  h1 {
    margin-bottom: 40px;
  }
}

.place {
  border: 1px solid #000;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  .place-name {
    margin-bottom: 20px;
  }
  .btn {
    padding: 5px 20px;
  }
}

.map {
  height: 400px;
  width: 100%;
}
</style>
