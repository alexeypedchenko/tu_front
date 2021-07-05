<template>
  <map-page
    v-if="dataLoaded"
    :items="filtredMarkers"
    :filters="getFilters"
    :filterList="getFilterList"
    storeName="markers"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MapPage from '~/components/blocks/MapPage'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.markers
    if (!dataLoaded) {
      await store.dispatch('markers/getCollection')
    }
  },
  components: {
    MapPage,
  },
  computed: {
    ...mapState('markers', [
      'dataLoaded',
    ]),
    ...mapGetters('markers', [
      'filtredMarkers',
      'getFilters',
      'getFilterList',
    ]),
  },
}
</script>