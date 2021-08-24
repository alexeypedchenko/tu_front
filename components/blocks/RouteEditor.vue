<template>
  <div class="route-editor">
    <!-- editedUserRoute: {{ editedUserRoute }} <br>
    settingUserRoute: {{ settingUserRoute }} <br> -->
    <div class="route-editor__content">
      <div class="route-editor__places">
        <card
          v-for="(place, index) in places"
          :key="place._id"
          :index="index"
          :item="place"
          size="sm"
        />
      </div>
    </div>
    <div class="route-editor__map">
      <google-map
        v-if="places.length"
        :items="places"
        :showRoute="true"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RouteEditor',
  data() {
    return {
      places: []
    }
  },
  watch: {
    profile() {
      this.getPlaces()
    },
    editedUserRoute() {
      this.getPlaces()
    }
  },
  computed: {
    ...mapState([
      'editedUserRoute',
      'settingUserRoute',
    ]),
    ...mapState('markers', [
      'list',
    ]),
    ...mapState('auth', [
      'profile',
    ]),
  },
  mounted() {
    console.log('this.list:', this.list)
    // console.log('this.profile.createdRoutes:', this.profile.createdRoutes)
    this.getPlaces()
  },
  methods: {
    getPlaces() {
      if (!this.profile && !this.editedUserRoute) return
      const route = this.profile.createdRoutes.find((route) => route.name === this.editedUserRoute)
      if (route) {
        this.places = this.list.filter((marker) => route.list.includes(marker._id))
      }
    }
  }
}
</script>

<style lang="scss">
.route-editor {
  display: flex;
  height: calc(100vh - 100px);
  padding: 0 20px 20px 20px;
}
.route-editor__content {
  position: relative;
  height: 100%;
  width: $container-sm;
  margin-right: 8px;
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
// .route-editor__items {
//   display: flex;
//   flex-wrap: wrap;
//   .card {
//     width: calc(50% - 8px);
//     margin-bottom: 16px;
//     &:nth-child(odd) {
//       margin-right: 16px;
//     }
//   }
// }
.route-editor__map {
  width: calc(100% - #{$container-sm});
  height: 100%;
  overflow: hidden;

  background: #FFFFFF;
  border-radius: 8px;
}
</style>
