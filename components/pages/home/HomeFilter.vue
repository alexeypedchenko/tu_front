<template>
  <div class="home-filter">
    <div class="container">
      <div class="home-filter-toggle">
        <div
          v-for="type in filterTypes"
          :key="type"
          @click="filterType = type"
        >
          {{ type }}
        </div>
      </div>
      <div class="home-filter-list">
        <div v-if="filterType === 'places'">
          <fltr
            storeName="markers"
            :filters="markerFilters"
            :filterList="markerFilterList"
            :items="markers"
            :searchField="false"
            route="/places"
          />
        </div>
        <div v-if="filterType === 'routes'">
          2
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFilter',
  data() {
    return {
      filterType: 'places',
      filterTypes: ['places', 'routes'],
    }
  },
  computed: {
    markers() {
      return this.$store.getters['markers/filtredMarkers']
    },
    markerFilters() {
      return this.$store.getters['markers/getFilters']
    },
    markerFilterList() {
      return this.$store.getters['markers/getFilterList']
    },
  },
  mounted() {
    // console.log('this.markerFilters:', this.markerFilters)
    // console.log('this.markerFilterList:', this.markerFilterList)
  }
}
</script>

<style lang="scss">
.home-filter {
  .fltr {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }
  .fltr__head {
    display: none;
  }
  .fltr__list {
    display: flex;
    width: 100%;
    margin-right: 8px;
  }
  .fltr__item {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  .fltr__footer {
    bottom: -14px;
  }
}
.home-filter-list {
  background: #FFFFFF;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px 32px 22px 32px;
}
.home-filter-toggle {
  display: none;
}
</style>
