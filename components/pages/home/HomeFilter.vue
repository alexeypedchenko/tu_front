<template>
  <div class="home-filter">
    <div class="container">
      <div class="home-filter-toggle">
        <div
          v-for="type in filterTypes"
          :key="type"
          @click="filterType = type"
          class="home-filter-type"
          :class="{'home-filter-type-active' : filterType === type}"
        >
          {{ type === 'places' ? 'Места' : 'Маршруты' }}
        </div>
      </div>
      <div class="home-filter-list">
        <transition name="fade" mode="out-in">
          <div
            v-if="filterType === 'places'"
            key="places"
          >
            <fltr
              storeName="markers"
              :filters="markerFilters"
              :filterList="markerFilterList"
              :items="markers"
              :searchField="false"
              route="/places"
            />
          </div>
          <div
            v-if="filterType === 'routes'"
            key="routes"
          >
            <fltr
              storeName="routes"
              :filters="routeFilters"
              :filterList="routeFilterList"
              :items="routes"
              :searchField="false"
              route="/routes"
            />
          </div>
        </transition>
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
    routes() {
      return this.$store.getters['routes/filtredRoutes']
    },
    routeFilters() {
      return this.$store.getters['routes/getFilters']
    },
    routeFilterList() {
      return this.$store.getters['routes/getFilterList']
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
  .container {
    background: #FFFFFF;
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 32px 32px 22px 32px;
  }
  .fltr {
    display: flex;
    align-items: flex-start;
    width: 100%;
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
    display: none;
  }
}
.home-filter-toggle {
  display: flex;
  margin-bottom: 15px;
}
.home-filter-type {
  margin-right: 15px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
  &:hover {
    border-color: rgba($main-cl, 0.3);
  }
  &.home-filter-type-active {
    border-color: $main-cl;
  }
}
</style>
