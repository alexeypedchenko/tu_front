<template>
  <div class="place-preview-list">
    <PlacePreview
      v-for="(item, index) in getFiltredPlaces"
      :key="item.id"
      :index="index"
      :item="item"
    />
  </div>
</template>

<script>
import PlacePreview from './PlacePreview'
export default {
  name: 'PlacePreviewList',
  components: {
    PlacePreview
  },
  computed: {
    getPlaces() {
      return this.$store.state.places.data
    },
  },
}
</script>

<style lang="scss">
.place-preview-list {
  padding: 20px;
  border: 1px solid #000;
  margin-bottom: 40px;
}
</style>