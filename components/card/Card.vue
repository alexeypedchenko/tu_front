<template>
  <div
    class="card"
    :class="{'card--sm' : size === 'sm'}"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    :style="`background-image: url(${item.image})`"
    @click.self="setSelf(index)"
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
          <card-favorite
            :type="item.type"
            :id="item._id"
          />
          <card-route
            v-if="item.type === 'marker'"
            :id="item._id"
          />
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
        <nuxt-link class="btn" :to="link">
          Подробнее
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Card',
  props: {
    size: {
      type: String,
      default: '',
    },
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
    ...mapGetters('map', ['isMapInit']),
    link() {
      if (this.item.type === 'marker') {
        return `/places/${this.item.link}`
      }
      if (this.item.type === 'route') {
        return `/routes/${this.item.slug}`
      }
      return '/'
    }
  },
  methods: {
    setSelf(index) {
      this.$emit('active', {
        index: index,
        item: this.item,
      })

      if (!this.isMapInit || this.item.type === 'route') return
      this.$store.commit('map/openInfoWindow', index)
    },
    handleEnter() {
      if (!this.isMapInit || this.item.type === 'route') return
      this.$store.commit('map/showHoveredMarker', this.item)
    },
    handleLeave() {
      if (!this.isMapInit || this.item.type === 'route') return
      this.$store.commit('map/showHoveredMarker', null)
    },
  }
}
</script>

<style lang="scss">
.card {
  border-radius: 8px;
  overflow: hidden;
  background: no-repeat center / cover;
  cursor: pointer;
}
.card__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  background: rgba(#000, 0.2);
  transition: 0.3s;
  pointer-events: none;
}
.card__name,
.card__description {
  color: #fff;
}
.card__head {
  display: flex;
  align-items: flex-start;
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
.card__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & > * {
    margin-bottom: 4px;
  }
}
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
  .btn {
    pointer-events: all;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}

.card:hover,
.card--active {
  .card__content {
    background: rgba(#000, 0.4);
  }
}

.card--sm {
  .card__content {
    min-height: 100px;
  }
  .card__name {
    margin-bottom: 0;
  }
  .card__description,
  .card__head,
  .card__footer {
    display: none;
  }
}
</style>
