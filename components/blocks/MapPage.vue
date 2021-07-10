<template>
  <div class="map-page">
    <div class="map-page__content">
      <header-small-header/>
      <div
        v-if="showFilter"
        class="map-page__filter"
      >
        <app-fltr
          :storeName="storeName"
          :filters="filters"
          :filterList="filterList"
          :items="items"
        />
      </div>
      <div class="map-page__items">
        <map-preview
          v-for="(item, index) in items"
          :key="item.id"
          :index="index"
          :item="item"
          @details-item="detailsItem"
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
  beforeMount() {
    this.$store.commit('smallHeader', true)
  },
  beforeDestroy() {
    this.$store.commit('smallHeader', false)
  },
  methods: {
    detailsItem(item) {
      this.$emit('details-item', item)
    }
  }
}
</script>

<style lang="scss">
.map-page {
  display: flex;
  height: 100vh;
}
.map-page__content {
  height: 100%;
  width: $container-sm;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.map-page__filter {
  margin-bottom: 20px;
}
.map-page__map {
  width: calc(100% - #{$container-sm});
  height: 100%;
}
</style>
