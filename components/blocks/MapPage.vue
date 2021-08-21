<template>
  <div class="map-page">
    <div
      ref="content"
      class="map-page__content"
    >
      <header-small-header/>
      <div
        v-if="showFilter"
        class="map-page__filter"
      >
        <fltr
          :storeName="storeName"
          :filters="filters"
          :filterList="filterList"
          :items="items"
        />
      </div>
      <div class="map-page__items">
        <card
          v-for="(item, index) in items"
          :key="item.id"
          :index="index"
          :item="item"
          @details-item="detailsItem"
          ref="mapPreview"
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
import {mapState} from 'vuex'

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
  computed: {
    ...mapState('map', ['hoveredMarkerIndex']),
  },
  watch: {
    hoveredMarkerIndex(data) {
      if (data === null) return
      const {
        content,
        mapPreview,
      } = this.$refs
      const item = mapPreview[data].$el
      content.scrollTo({
        top: item.offsetTop - 50,
        behavior: 'smooth'
      })
    },
  },
  methods: {
    detailsItem(item) {
      this.$emit('details-item', item)
    }
  },
  beforeMount() {
    this.$store.commit('smallHeader', true)
  },
  beforeDestroy() {
    this.$store.commit('smallHeader', false)
    this.$store.commit('map/mapDestroy')
  },
}
</script>

<style lang="scss">
.map-page {
  display: flex;
  height: 100vh;
}
.map-page__content {
  position: relative;
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
  .fltr__list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    .fltr__item {
      width: calc(50% - 4px);
      margin-bottom: 8px;
      &:nth-child(odd) {
        margin-right: 8px;
      }
    }
  }
}
.map-page__map {
  width: calc(100% - #{$container-sm});
  height: 100%;
}
</style>
