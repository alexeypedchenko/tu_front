<template>
  <map-page
    v-if="dataLoaded"
    :items="filtredPlaces"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MapPage from '~/components/blocks/MapPage'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.places
    if (!dataLoaded) {
      await store.dispatch('places/getCollection')
    }
  },
  components: {
    MapPage,
  },
  computed: {
    ...mapState('places', [
      'dataLoaded',
      'list'
    ]),
    ...mapGetters('places', [
      'filtredPlaces',
    ]),
  },
}
</script>