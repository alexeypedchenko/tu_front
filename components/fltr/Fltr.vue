<template>
  <div class="fltr">
    <div class="fltr__head">
      <div class="fltr__name">
        Filter
      </div>
      <button class="fltr__clear" @click="clearFilters">
        clear filters
      </button>
    </div>

    <div class="fltr__list">
      <fltr-item
        @change="filterItemChange"
        :list="this.tags"
        :currentValue="this.tag"
        name="Choice tag"
        placeholder="Choice tag"
      />
    </div>

    <search-fltr />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import SearchFltr from './SearchFltr'
import FltrItem from './FltrItem'


export default {
  name: 'Fltr',
  components: {
    SearchFltr,
    FltrItem,
  },
  computed: {
    ...mapState('filters', [
      'tags',
      'tag',
    ])
  },
  mounted() {
  },
  methods: {
    filterItemChange({name, value}) {
      this.$store.commit(`filters/${name}`, value)
    },
    clearFilters() {
      this.$store.commit('filters/clearFilters')
    }
  }
}
</script>

<style>
.fltr {
  border: 1px solid #000;
  padding: 10px;
  margin-bottom: 40px;
}
.fltr__name {
  margin-bottom: 20px;
}
.fltr__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fltr__clear {
  padding: 5px 15px;
}
.fltr__list {
  display: flex;
  margin-bottom: 20px;
}
</style>
