<template>
  <div class="map-page">
    <div class="map-page__content">
      <div
        v-if="showFilter"
        class="map-page__filter"
      >
        <app-fltr
          :storeName="storeName"
          :filters="filters"
          :filterList="filterList"
        />
      </div>
      <div class="map-page__items">
        <map-preview
          v-for="(item, index) in items"
          :key="item.id"
          :index="index"
          :item="item"
        />
      </div>
    </div>

    <div class="map-page__map">
      <google-map
        :items="items"
      />
    </div>
  </div>
</template>

<script>
import Fltr from '~/components/fltr/Fltr'
import MapPreview from '~/components/blocks/MapPreview'
import GoogleMap from '~/components/google/GoogleMap'

export default {
  name: 'MapPage',
  props: {
    storeName: {
      type: String,
      default: '',
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    filterList: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AppFltr: Fltr,
    MapPreview,
    GoogleMap,
  },
}
</script>

<style lang="scss">
.map-page {
  display: flex;
  height: calc(100vh - 60px);
}
.map-page__content {
  padding: 20px;
  min-width: 700px;
  width: 700px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.map-page__filter {
  margin-bottom: 20px;
}
.map-page__items {
  overflow: auto;
  flex-grow: 1;
  padding: 20px;
  border: 1px solid #000;
}
.map-page__map {
  width: 100%;
  height: 100%;
}
</style>
