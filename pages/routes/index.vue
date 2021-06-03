<template>
  <div class="route">
    <map-page
      :previews="getFiltredPlaces"
    />
  </div>
</template>

<script>
import MapPage from '~/components/blocks/MapPage'

export default {
  components: {
    MapPage,
  },
}
</script>
