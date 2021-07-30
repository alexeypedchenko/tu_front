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
import { getDoc } from '~/firebase/firebaseApi'
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
  methods: {
    async detailsItem(item) {
      const {placeId} = item
      const collection = 'places'
      let place = this.checkPlace(placeId)
      if (!place) {
        place = await getDoc(collection, placeId)
        this.$store.commit('places/setNewPlace', place)
      }
      this.$router.push(`/places/${place.name}`)
    },
    checkPlace(placeId) {
      const places = this.$store.state.places.list
      const index = places.findIndex((place) => place._id === placeId)
      if (index === -1) {
        return null
      }
      return places[index]
    }
  }
}
</script>