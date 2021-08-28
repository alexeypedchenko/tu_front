<template>
  <blocks-map-page
    v-if="dataLoaded"
    :items="filtredRoutes"
    :filters="getFilters"
    :filterList="getFilterList"
    storeName="routes"
    pages-collection="routes"
    favorites-collection="favoriteRoutes"
    :showMap="false"
  />
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.routes
    if (!dataLoaded) {
      await store.dispatch('routes/getCollection')
    }
  },
  computed: {
    ...mapState('routes', [
      'dataLoaded',
      'list'
    ]),
    ...mapGetters('routes', [
      'filtredRoutes',
      'getFilters',
      'getFilterList',
    ]),
  },
}
</script>
