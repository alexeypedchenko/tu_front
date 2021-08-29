<template>
  <blocks-map-page
    v-if="dataLoaded"
    :items="filtredMarkers"
    :filters="getFilters"
    :filterList="getFilterList"
  />
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.markers
    if (!dataLoaded) {
      await store.dispatch('markers/getCollection')
    }
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