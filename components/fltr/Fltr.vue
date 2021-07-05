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
        v-for="[key, value] in Object.entries(filters)"
        :key="key"
        :list="value"
        :currentValue="key"
        :name="key"
        :title="$store.state.lang.filters[key]"
        :placeholder="$store.state.lang.filters[key]"
        @change="filterItemChange"
      />
    </div>

    <search-fltr
      name="name"
      :value="filters.name"
      @input="filterItemChange"
    />

    <pre>{{filterList}}</pre>
  </div>
</template>

<script>
import SearchFltr from './SearchFltr'
import FltrItem from './FltrItem'

export default {
  name: 'Fltr',
  props: {
    storeName: {
      type: String,
      default: '',
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    filterList: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    SearchFltr,
    FltrItem,
  },
  data() {
    return {
      hasFilters: false,
    }
  },
  methods: {
    filterItemChange(props) {
      this.$store.commit(`${this.storeName}/setFilterValue`, props)
      this.checkFilters()
    },
    clearFilters() {
      this.hasFilters = false
      this.$store.commit(`${this.storeName}/clearFilters`)
    },
    checkFilters() {
      for(const key of Object.keys(this.filters)) {
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
