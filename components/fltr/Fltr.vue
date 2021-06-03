<template>
  <div class="fltr">
    <div class="fltr__head">
      <div class="fltr__name">
        Filter
      </div>
      <button
        v-if="hasFilters"
        class="fltr__clear"
        @click="clearFilters"
      >
        clear all filters
      </button>
    </div>

    <div class="fltr__list">
      <!-- Имя инпута должно совпадать с названием фильтра и полем фильтруемого оъекта -->
      <fltr-item
        :list="getTags"
        :currentValue="tags"
        name="tags"
        title="Choice tag"
        placeholder="Choice tag"
        @change="filterItemChange"
      />

      <fltr-item
        :list="getTowns"
        :currentValue="town"
        name="town"
        title="Choice town"
        placeholder="Choice town"
        @change="filterItemChange"
      />

      <fltr-item
        :list="getRegions"
        :currentValue="region"
        name="region"
        title="Choice region"
        placeholder="Choice region"
        @change="filterItemChange"
      />
    </div>

    <search-fltr
      name="name"
      :value="name"
      @input="filterItemChange"
    />
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
} from 'vuex'
import SearchFltr from './SearchFltr'
import FltrItem from './FltrItem'

export default {
  name: 'Fltr',
  components: {
    SearchFltr,
    FltrItem,
  },
  data() {
    return {
      hasFilters: false,
    }
  },
  computed: {
    ...mapState(['filters']),
    ...mapState('filters', [
      'tags',
      'town',
      'region',
      'name'
    ]),
    ...mapGetters('filters', [
      'getTags',
      'getTowns',
      'getRegions',
    ]),
  },
  methods: {
    filterItemChange(props) {
      this.$store.commit('filters/setFilterValue', props)
      this.checkFilters()
    },
    clearFilters() {
      this.hasFilters = false
      this.$store.commit('filters/clearFilters')
    },
    checkFilters() {
      console.log('checkFilters:')
      for(const key of Object.keys(this.filters)) {
        console.log('this.filters[key]:', this.filters[key])
        if (this.filters[key]) {
          this.hasFilters = true
          break
        }
        this.hasFilters = false
      }
    }
  }
}
</script>

<style lang="scss">
.fltr {
  border: 1px solid #000;
  padding: 10px;
  position: relative;
}
.fltr__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.fltr__clear {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 15px;
}
.fltr__list {
  display: flex;
  margin-bottom: 20px;
  & > *:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
