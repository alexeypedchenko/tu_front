<template>
  <map-page
    v-if="dataLoaded"
    :items="filtredMarkers"
    :filters="getFilters"
    :filterList="getFilterList"
    storeName="markers"
    @details-item="detailsItem"
  />
</template>

<script>
import { getObjectByKey } from '~/js/utils'
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
      'list'
    ]),
    ...mapGetters('markers', [
      'filtredMarkers',
      'getFilters',
      'getFilterList',
    ]),
  },
  methods: {
    async detailsItem(item) {
      const places = this.$store.state.places.list
      const place = getObjectByKey(places, '_id', item.placeId)
      this.$router.push(`/places/${place.slug}`)
    },
  }
}
</script>