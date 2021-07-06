<template>
  <div
    class="map-preview"
    @mouseover="handleOver"
    @mouseout="handleOut"
  >
    <div class="map-preview__head">
      <div
        v-if="item.tags"
        class="map-preview__tags"
      >
        <div
          v-for="tag in item.tags"
          :key="tag"
          class="map-preview__tag"
        >
          {{ tag }}
        </div>
      </div>
      <div class="map-preview__actions">
        <button @click="handleRoute">
          to route
        </button>
      </div>
    </div>

    <div class="map-preview__body">
      <div
        v-if="item.name"
        class="map-preview__name"
      >
        {{ item.name }}
      </div>
      <div
        v-if="item.description"
        class="map-preview__description"
      >
        {{ item.description }}
      </div>
    </div>

    <div class="map-preview__footer">
      <button @click="handleDetails">
        Details ->
      </button>
      <button @click="showOnMap(index)">
        Show on map ()
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapPreview',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quis quibusdam, repellendus unde totam laboriosam odio dolorum itaque doloremque temporibus!',
    }
  },
  computed: {
    hasInFavorites() {
      return this.$store.state[this.item.type + 's'].favorites.includes(this.item)
    },
  },
  methods: {
    handleRoute() {
      console.log('Place added to Route')
    },
    handleDetails() {
      this.$emit('details-item', this.item)
    },
    showOnMap(index) {
      this.$store.commit('map/openInfoWindow', index)
    },
    handleOver() {
      this.$store.commit('map/showHoveredMarker', this.item)
    },
    handleOut() {
      this.$store.commit('map/showHoveredMarker', null)
    },
  }
}
</script>

<style lang="scss">
.map-preview {
  border: 1px solid #000;
  min-height: 200px;
  padding: 20px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.map-preview__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.map-preview__tags {
  display: flex;
}
.map-preview__tag:not(:last-child) {
  margin-right: 5px;
}
.map-preview__tag {
  border: 1px solid #000;
  border-radius: 20px;
  padding: 2px 7px;
  font-size: 12px;
}
.map-preview__actions {
  button {
    &.active {
      background: lime;
    }
    padding: 5px 10px;
  }
}
.map-preview__name {
  font-size: 20px;
  font-size: 18px;
  margin-bottom: 20px;
}
.map-preview__description {
  font-size: 16px;
  margin-bottom: 20px;
}
.map-preview__footer {
  display: flex;
  button {
    padding: 7px 15px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
