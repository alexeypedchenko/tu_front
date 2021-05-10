<template>
  <div class="place-preview">
    <div
      class="place"
      v-for="(place, index) in getPlaces"
      :key="place.id"
    >
      <h3 class="place-name">
        {{ place.name }}
      </h3>
      <div class="place-actions">
        <button class="btn" @click="$router.push(`/place/${place.id}`)">
          go to {{ place.name }}
        </button>
        <button class="btn" @click="showOnMap(index)">
          show on map
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlacePreview',
  methods: {
    showOnMap(index) {
      this.$store.commit('openInfoWindow', index)
    }
  }
}
</script>

<style lang="scss">
.place-preview {
  display: flex;
  flex-wrap: wrap;
  .place {
    width: calc(33.333333% - 15px);
    margin-right: 20px;
    &:nth-child(3n) {
      margin-right: 0;
    }
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
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>