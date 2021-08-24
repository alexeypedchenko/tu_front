<template>
  <div class="route-editor">
    <!-- editedUserRoute: {{ editedUserRoute }} <br> -->
    <!-- settingUserRoute: {{ settingUserRoute }} <br> -->

    <div class="route-editor__content">
      <route-select />

      <route-places
        :places="places"
      />
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
      route: null,
      places: [],
    }
  },
  watch: {
    profile() {
      this.getRoute()
    },
    editedUserRoute() {
      this.getRoute()
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
    this.getRoute()
  },
  methods: {
    getRoute() {
      if (!this.profile && !this.editedUserRoute) return
      this.route = this.profile.createdRoutes.find((route) => route.name === this.editedUserRoute.name)
      if (this.route) {
        this.places = this.list.filter((marker) => this.route.list.includes(marker._id))
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
  .route-select {
    margin-bottom: 20px;
  }
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
