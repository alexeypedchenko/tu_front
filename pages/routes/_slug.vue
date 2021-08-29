<template>
  <div>
    <page-head
      :title="page.name"
      :description="page.description"
      :image="page.image"
    />
    <builder :blocks="page.pageBlocks" />
  </div>
</template>

<script>
import { getObjectByKey } from '~/js/utils'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('routes', [
      'list',
    ]),
    page() {
      const slug = this.$route.params.slug
      return getObjectByKey(this.list, 'slug', slug)
    }
  },
  mounted() {
    console.log('this.page:', this.page)
  },
}
</script>

<style lang="scss">
</style>
