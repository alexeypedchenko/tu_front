<template>
  <div class="profile-favorites">
    <h3>
      Избранные {{ title }}
    </h3>
    <div
      v-if="favorites.length"
      class="profile-favorites__list"
    >
      <card
        v-for="(item, index) in favorites"
        :key="item.id"
        :index="index"
        :item="item"
        :favorites-collection="favoritesCollection"
        :pages-collection="pagesCollection"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileFavorites',
  props: {
    title: {
      type: String,
      default: '',
    },
    collection: {
      type: String,
      default: '',
    },
    favoritesCollection: {
      type: String,
      default: '',
    },
    pagesCollection: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      favorites: [],
    }
  },
  watch: {
    profile() {
      this.setFavorites()
    }
  },
  computed: {
    ...mapState('auth', [
      'profile',
    ]),
  },
  mounted() {
    this.setFavorites()
  },
  methods: {
    setFavorites() {
      const collection = this.$store.state[this.collection].list
      if (!!this.profile) {
        this.favorites = collection.filter((item) => this.profile[this.favoritesCollection].includes(item._id))
      }
    },
  }
}
</script>

<style lang="scss">
.profile-favorites {
  background: #FFFFFF;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
  h3 {
    margin-bottom: 20px;
  }
}
.profile-favorites__list {
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 280px;
    margin-right: 16px;
    margin-bottom: 16px;
  }
}
</style>
