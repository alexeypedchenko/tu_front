<template>
  <div class="fltr">
    <div
      v-if="title"
      class="fltr__head"
    >
      <div class="fltr__title">
        {{ title }}
      </div>
      <button
        v-if="hasFilters"
        class="fltr__clear"
        @click="clearFilters"
      >
        Очистить все фильтры
      </button>
    </div>

    <search-fltr
      v-if="searchField"
      name="name"
      :value="filters.name"
      @input="filterItemChange"
      :items="items"
      placeholder="Водопад, гора, лиман, парк ..."
    />

    <div class="fltr__list">
      <!-- Имя инпута должно совпадать с названием фильтра и полем фильтруемого оъекта -->
      <fltr-item
        v-for="[key, value] in Object.entries(filterList)"
        :key="key"
        :list="value"
        :currentValue="key"
        :name="key"
        :filtersCount="getFiltersCount"
        :value="filters[key]"
        :title="$store.state.lang.filters[key]"
        :placeholder="$store.state.lang.filters[key]"
        @change="filterItemChange"
      />
    </div>

    <nuxt-link v-if="route" class="btn" :to="route">
      применить
    </nuxt-link>

    <div
      class="fltr__footer"
      :class="{'fltr__footer--visible' : hasFilters}"

    >
      <b>Найдено:</b> {{ items.length }} мест.
    </div>
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
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    filterList: {
      type: Object,
      default: () => ({}),
    },
    searchField: {
      type: Boolean,
      default: true,
    },
    route: {
      type: String,
      default: '',
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
  computed: {
    getFiltersCount() {
      const filtersCount = {}
      this.items.forEach((item) => {
        for(const filter of Object.keys(this.filters)) {
          if(filter === 'name') continue

          this.filterList[filter].forEach(el => {
            filtersCount[el] = filtersCount[el] || 0
            switch (typeof item[filter]) {
              case 'string':
                if (item[filter] === el)
                  filtersCount[el]++
                break
              case 'object':
                if (item[filter].includes(el))
                  filtersCount[el]++
                break
              default:
                break
            }
          });
        }
      })
      return filtersCount
    },
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
  position: relative;
  padding-bottom: 10px;
  .search-fltr {
    margin-bottom: 8px;
  }
}
.fltr__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fltr__title {
  margin-bottom: 20px;
  font-size: 18px;
}
.fltr__clear {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 5px 15px;
}
.fltr__footer {
  font-size: 14px;
  opacity: 0;
  margin-top: 2px;
}
.fltr__footer--visible {
  opacity: 1;
}
</style>
