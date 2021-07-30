<template>
  <dynamic-page
    :page="page"
  />
</template>

<script>
import { getDoc } from '~/firebase/firebaseApi'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      page: {}
    }
  },
  computed: {
    ...mapState('places', [
      'list',
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      this.setPage()
    })
  },
  methods: {
    async setPage() {
      const name = this.$route.params.name
      const index = this.list.findIndex((place) => place.name === name)
      // если элемента нет в хранилище, делаем запрос с условием на его получение с firebase
      if (index === -1) {
        this.$nuxt.$loading.start()
        const condition = {
          prop: 'name',
          val: name,
        }
        const collection = 'places'
        const place = await getDoc(collection, null, condition)
        // если элемент соответствует условию, добавляем его в хранилище
        if (place) {
          this.$store.commit('places/setNewPlace', place)
          this.page = place
        }
        this.$nuxt.$loading.finish()
        return
      }
      this.page = this.list[index]
    }
  },
}
</script>

<style lang="scss">
</style>
