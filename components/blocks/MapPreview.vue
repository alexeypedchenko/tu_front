<template>
  <div
    class="map-preview"
    :class="{'map-preview--active' : index === hoveredMarkerIndex}"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <img
      class="map-preview__img"
      :src="item.image"
      :alt="item.name"
    >
    <div class="map-preview__content">
      <div class="map-preview__head">
        <div
          v-if="item.tags"
          class="map-preview__tags"
        >
          <div
            v-for="tag in item.tags"
            :key="tag"
            class="map-preview__tag tag"
          >
            #{{ tag }}
          </div>
        </div>
        <div class="map-preview__actions">
          <button @click.stop="handleRoute">
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
        <button class="btn" @click.stop="handleDetails">
          Подробнее
        </button>
        <button class="btn" @click="showOnMap(index)">
          На карте
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'

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
  computed: {
    ...mapState('map', ['hoveredMarkerIndex']),
    ...mapGetters('map', ['isMapInit']),
  },
  methods: {
    handleRoute() {
      console.log('Place added to Route')
    },
    handleDetails() {
      this.$emit('details-item', this.item)
    },
    showOnMap(index) {
      if (!this.isMapInit) return
      this.$store.commit('map/openInfoWindow', index)
    },
    handleEnter() {
      if (!this.isMapInit) return
      this.$store.commit('map/showHoveredMarker', this.item)
    },
    handleLeave() {
      if (!this.isMapInit) return
      this.$store.commit('map/showHoveredMarker', null)
    },
  }
}
</script>

<style lang="scss">
.map-preview {
  // cursor: pointer;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 7px 20px 0 rgba(#000, 0.12);
  transition: 0.3s;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.map-preview__img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  display: block;
}
.map-preview__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.map-preview__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 10px 5px 10px;
  background: linear-gradient(to bottom, rgba(#000, 0.5), transparent);
}
.map-preview__tags {
  display: flex;
  flex-wrap: wrap;
  .tag {
    margin-bottom: 5px;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
.map-preview__actions {
  button {
    white-space: nowrap;
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
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  .btn:not(:last-child) {
    margin-right: 10px;
  }
}

.map-preview:hover,
.map-preview--active {
  box-shadow: 0 10px 25px 0 rgba(#000, 0.25);
}
</style>
