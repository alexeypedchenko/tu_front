<template>
  <div class="map-page">
    <div
      ref="content"
      class="map-page__content"
    >
      <div class="map-page__filter">
        <fltr
          :filters="filters"
          :filterList="filterList"
          :items="items"
          storeName="markers"
          title="Открой для себя больше новых мест!"
        />
      </div>
      <div class="map-page__items">
        <card
          v-for="(item, index) in items"
          :key="item.id"
          :index="index"
          :item="item"
          ref="mapPreview"
          :class="{'card--active' : index === hoveredMarkerIndex}"
        />
      </div>
    </div>

    <div class="map-page__map">
      <google-map
        :items="items"
        :route="route"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MapPage',
  props: {
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
    route: {
      type: Array,
      default: () => ([]),
    },
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
  computed: {
    ...mapState('map', ['hoveredMarkerIndex']),
  },
}
</script>

<style lang="scss">
.map-page {
  display: flex;
  height: calc(100vh - 100px);
  padding: 0 20px 20px 20px;
}
.map-page__content {
  position: relative;
  height: 100%;
  width: $container-sm;
  margin-right: 8px;
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.map-page__filter {
  .fltr__list {
    display: flex;
    flex-wrap: wrap;
    .fltr__item {
      width: calc(50% - 4px);
      margin-bottom: 8px;
      &:nth-child(odd) {
        margin-right: 8px;
      }
    }
  }
}
.map-page__items {
  display: flex;
  flex-wrap: wrap;
  .card {
    width: calc(50% - 8px);
    margin-bottom: 16px;
    &:nth-child(odd) {
      margin-right: 16px;
    }
  }
}
.map-page__map {
  width: calc(100% - #{$container-sm});
  height: 100%;
  overflow: hidden;

  background: #FFFFFF;
  // box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}
</style>
