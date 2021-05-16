<template>
  <div
    class="place-preview"
    @mouseover="handleOver"
    @mouseout="handleOut"
  >
    <div class="place-preview-tags">
      <span
        v-for="tag in item.tags"
        :key="tag"
      >
        {{ tag }}
      </span>
    </div>
    <h3 class="place-preview-name">
      {{ item.name }}
    </h3>
    <div class="place-preview-actions">
      <button class="btn" @click="$router.push(`/place/${item.id}`)">
        go to {{ item.name }}
      </button>
      <button class="btn" @click="showOnMap(index)">
        show on map
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlacePreview',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    showOnMap(index) {
      this.$store.commit('openInfoWindow', index)
    },
    handleOver() {
      this.$store.commit('showHoveredMarker', this.item)
    },
    handleOut() {
      this.$store.commit('showHoveredMarker', null)
    },
  }
}
</script>

<style lang="scss">
.place-preview {
  border: 1px solid #000;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.place-preview-name {
  margin-bottom: 20px;
}
.place-preview-actions {
  .btn {
    padding: 5px 20px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>