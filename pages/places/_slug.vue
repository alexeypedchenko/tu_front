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
    ...mapState('places', [
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
  methods: {
    async setPage() {
      // // если элемента нет в хранилище, делаем запрос с условием на его получение с firebase
      // this.$nuxt.$loading.start()
      // const condition = {
      //   prop: 'name',
      //   val: name,
      // }
      // const collection = 'places'
      // const place = await getDocByCondition(collection, condition)
      // // если элемент соответствует условию, добавляем его в хранилище
      // if (place) {
      //   this.$store.commit('places/setNewPlace', place)
      //   this.page = place
      // }
      // this.$nuxt.$loading.finish()
    }
  },
}
</script>

<style lang="scss">
</style>
