<template>
  <div class="profile-markers">
    <h3>
      Избранные места
    </h3>
    <div
      v-if="favoritePlaces.length"
      class="profile-markers__list"
    >
      <card
        v-for="(item, index) in favoritePlaces"
        :key="item.id"
        :index="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileMarkers',
  data() {
    return {
      favoritePlaces: [],
    }
  },
  watch: {
    profile() {
      this.setFavoritePlaces()
    }
  },
  computed: {
    ...mapState('auth', [
      'profile',
    ]),
    ...mapState('markers', [
      'list',
    ]),
  },
  mounted() {
    this.setFavoritePlaces()
  },
  methods: {
    setFavoritePlaces() {
      if (!!this.profile) {
        this.favoritePlaces = this.list.filter((marker) => this.profile.favoritePlaces.includes(marker._id))
      }
    },
  }
}
</script>

<style lang="scss">
.profile-markers {
  background: #FFFFFF;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
  h3 {
    margin-bottom: 20px;
  }
}
.profile-markers__list {
  display: flex;
  flex-wrap: wrap;
  .card {
    margin-right: 16px;
    margin-bottom: 16px;
  }
}
</style>
