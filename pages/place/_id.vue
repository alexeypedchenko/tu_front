<template>
  <div class="place-page">
    <div class="container">
      <h1>
        {{ place.name }}
      </h1>
    </div>
  </div>
</template>

<script>
import { place } from '~/utils/dbscheme'
export default {
  computed: {
    place() { return place}
  },
  mounted() {
    console.log('this.$route:', this.$route.params.id)
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
