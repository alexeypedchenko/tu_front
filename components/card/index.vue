<template>
  <div
    class="card"
    :class="{'card--active' : index === hoveredMarkerIndex}"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <img
      class="card__img"
      :src="item.image"
      :alt="item.name"
    >
    <div class="card__content">
      <div class="card__head">
        <div
          v-if="item.tags"
          class="card__tags"
        >
          <div
            v-for="tag in item.tags"
            :key="tag"
            class="card__tag tag"
          >
            #{{ tag }}
          </div>
        </div>
        <div class="card__actions">
          <card-favorite :id="item._id" />
          <!-- TODO add to route -->
        </div>
      </div>

      <div class="card__body">
        <div
          v-if="item.name"
          class="card__name"
        >
          {{ item.name }}
        </div>
        <div
          v-if="item.description"
          class="card__description"
        >
          {{ item.description }}
        </div>
      </div>

      <div class="card__footer">
        <nuxt-link class="btn" :to="`/places/${item.link}`">
          Подробнее
        </nuxt-link>
        <button class="btn" @click="showOnMap(index)">
          На карте
          <!-- TODO открывать карту в модальном окне -->
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Card',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    ...mapState('map', ['hoveredMarkerIndex']),
    ...mapGetters('map', ['isMapInit']),
  },
  methods: {
    handleDetails() {
      this.$emit('details-item', this.item)
    },
    showOnMap(index) {
      if (!this.isMapInit) return
      this.$store.commit('map/openInfoWindow', index)
    },
    handleEnter() {
      if (!this.isMapInit) return
      this.$store.commit('map/showHoveredMarker', this.item)
    },
    handleLeave() {
      if (!this.isMapInit) return
      this.$store.commit('map/showHoveredMarker', null)
    },
  }
}
</script>

<style lang="scss">
.card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}
.card__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  z-index: 1;
}
.card__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  position: relative;
  z-index: 2;
  background: rgba(#000, 0.2);
  color: #fff;
  transition: 0.3s;
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}
.card__tags {
  display: flex;
  flex-wrap: wrap;
  .tag {
    margin-bottom: 5px;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
.card__actions {}
.card__name {
  font-size: 20px;
  font-size: 18px;
  margin-bottom: 20px;
}
.card__description {
  font-size: 16px;
  margin-bottom: 20px;
}
.card__body {
  margin-top: auto;
}
.card__footer {
  display: flex;
  .btn:not(:last-child) {
    margin-right: 10px;
  }
}

.card:hover,
.card--active {
  .card__content {
    background: rgba(#000, 0.4);
  }
}
</style>
