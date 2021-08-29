<template>
  <route-page
    v-if="dataLoaded"
    :items="filtredRoutes"
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
    const {dataLoaded} = store.state.routes
    if (!dataLoaded) {
      await store.dispatch('routes/getCollection')
    }
  },
  computed: {
    ...mapState('routes', [
      'dataLoaded',
    ]),
    ...mapGetters('routes', [
      'filtredRoutes',
      'getFilters',
      'getFilterList',
    ]),
  },
}
</script>
