<template>
  <div class="route-page">
    <div class="container">
      <div class="route-page__filter">
        <fltr
          :filters="filters"
          :filterList="filterList"
          :items="items"
          storeName="routes"
        />
      </div>

      <div class="route-page__items">
        <card
          class="route-page__card"
          v-for="(item, index) in items"
          :key="item.id"
          :index="index"
          :item="item"
          @active="setActiveRoute"
        />
      </div>
    </div>

    <modal
      :opened="modal"
      @close="modal = false"
      size="fs"
      class="route-modal"
    >
      <div class="route-modal__content" v-if="activeRoute && modal">
        <div class="route-modal__items">
          <h3 class="route-modal__title">
            Места на маршруте:
          </h3>
          <card
            class="route-modal__card"
            v-for="(item, index) in activeRoute"
            :key="item.id"
            :index="index"
            :item="item"
          />
        </div>
        <div class="route-modal__map">
          <google-map
            :items="activeRoute"
            :route="activeRoute"
          />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoutePage',
  props: {
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
    route: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      activeRoute: null,
      modal: false,
    }
  },
  computed: {
    ...mapState('markers', ['list'])
  },
  methods: {
    setActiveRoute(data) {
      this.activeRoute = this.list.filter((place) => data.item.markers.includes(place._id))
      this.modal = true
    },
  }
}
</script>


<style lang="scss">
.route-page__filter {
  .fltr__list {
    display: flex;
    flex-wrap: wrap;
  }
  .fltr__item {
    width: calc(50% - 4px);
    margin-bottom: 8px;
    &:nth-child(odd) {
      margin-right: 8px;
    }
  }
}
.route-page__items {
  display: flex;
  flex-wrap: wrap;
}
.route-page__card {
  width: calc(25% - 15px);
  margin-right: 20px;
  margin-bottom: 20px;
  &:nth-child(4n) {
    margin-right: 0;
  }
}

.route-modal .modal__content {
  height: 100%;
}
.route-modal__content {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.route-modal__items {
  width: 280px;
}
.route-modal__title {
  margin-bottom: 10px;
}
.route-modal__card {
  width: 100%;
  margin-bottom: 20px;
}
.route-modal__map {
  height: 100%;
  width: calc(100% - 300px);
  border-radius: 4px;
  overflow: hidden;
}
</style>
