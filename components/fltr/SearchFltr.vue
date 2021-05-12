<template>
  <div class="search-fltr">
    <div v-if="name" class="search-fltr__title">
      {{ name }}
    </div>
    <input class="search-fltr__field" type="text" :value="search" @input="handleSearch($event.target.value)">
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'SearchFltr',
  props: {
    name: {
      type: String,
      default: 'Search place:',
    },
  },
  data() {
    return {
      searchValue: 'name',
    }
  },
  computed: {
    ...mapState('filters', ['search']),
  },
  methods: {
    handleSearch(value) {
      this.$store.commit('filters/searchFilter', value)
    }
  }
}
</script>

<style lang="scss">
.search-fltr {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #000;
}
.search-fltr__title {
  margin-right: 10px;
}
.search-fltr__field {
  padding: 5px;
  flex-grow: 1;
}
</style>
