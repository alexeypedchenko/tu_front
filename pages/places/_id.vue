<template>
  <PlacePage :item="place" />
</template>

<script>
import {mapState} from 'vuex'
import PlacePage from '~/components/places/PlacePage'

export default {
  async fetch ({store}) {
    const {dataLoaded} = store.state.places
    if (!dataLoaded) {
      await store.dispatch('places/getCollection')
    }
  },
  components: {
    PlacePage
  },
  mounted() {
    console.log('this.place:', this.place)
  },
  computed: {
    ...mapState('places', [
      'list',
    ]),
    place() {
      return this.list.find((place) => place._id === this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
</style>
