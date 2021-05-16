<template>
  <div>
    <PlacePage :item="place" />
  </div>
</template>

<script>
import PlacePage from '~/components/places/PlacePage'
export default {
  components: {
    PlacePage
  },
  computed: {
    place() {
      return this.$store.state.places.data.find((place) => +place.id === +this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.place-page {
  h1 {
    margin-bottom: 40px;
  }
}
</style>
