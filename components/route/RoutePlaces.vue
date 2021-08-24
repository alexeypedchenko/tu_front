<template>
  <div class="route-places">
    <div
      class="route-place"
      v-for="(item, index) in localPlaces"
      :key="item._id"
    >
      <div class="route-place__actions">
        {{ index + 1 }}.
        <button @click="showConfirmDeletePlaceModal(index)">
          Удалить
        </button>
        <button>
          Порядок /\ \/
        </button>
      </div>
      <card
        :index="index"
        :item="item"
        size="sm"
      />
    </div>

    <modal-confirm
      :opened="confirmDeletePlaceModal"
      text="Удалить место из избранного?"
      @close="closeConfirmDeletePlaceModal"
      @yes="deletePlace"
    />
  </div>
</template>

<script>
export default {
  name: 'RoutePlaces',
  props: {
    places: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    places() {
      this.setLocalData()
    },
  },
  data() {
    return {
      localPlaces: [],
      confirmDeletePlaceModal: false,
      deletedPlaceIndex: null,
    }
  },
  mounted() {
    this.setLocalData()
  },
  methods: {
    setLocalData() {
      this.localPlaces = JSON.parse(JSON.stringify(this.places))
    },
    emitData() {
      console.log('emitData:')
      this.$emit('change', this.localPlaces)
      this.$emit('input', this.localPlaces)
    },
    deletePlace() {
      this.localPlaces.splice(this.deletedPlaceIndex, 1)
      this.closeConfirmDeletePlaceModal()
      this.emitData()
    },
    showConfirmDeletePlaceModal(index) {
      this.confirmDeletePlaceModal = true
      this.deletedPlaceIndex = index
    },
    closeConfirmDeletePlaceModal() {
      this.confirmDeletePlaceModal = false
      this.deletedPlaceIndex = null
    },
  }
}
</script>

<style lang="scss">
.route-places {}
.route-place {
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.route-place__actions {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  button {
    &:first-child {
      margin-left: auto;
    }
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
