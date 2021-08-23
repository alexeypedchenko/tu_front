<template>
  <div class="user-routes">
    <h3>
      Пользовательские маршруты
    </h3>
    <template v-if="profile">
      <transition name="fade" mode="out-in">
        <profile-user-route
          v-if="selectedRoute"
          key="1"
          :user-route="selectedRoute"
          @back="selectedRoute = null"
          @updateRoute="selectRoute"
        />
        <div
          v-else
          class="user-routes__list"
          key="2"
        >
          <div
            class="user-routes__item"
            v-for="route in createdRoutes"
            :key="route.name"
            @click="selectRoute(route.name)"
          >
            {{ route.name }} - <small>{{ route.list.length }} мест</small>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserRoutes',
  data() {
    return {
      selectedRoute: null,
    }
  },
  watch: {
    profile() {
      console.log('this.createdRoutes:', this.createdRoutes)
    }
  },
  computed: {
    ...mapState('auth', [
      'profile',
    ]),
    createdRoutes() {
      return this.profile.createdRoutes
    }
  },
  mounted() {
    console.log('this.profile:', this.profile)
  },
  methods: {
    selectRoute(name) {
      if (this.profile) {
        this.selectedRoute = this.createdRoutes.find((route) => route.name === name)
      }
    }
  }
}
</script>

<style lang="scss">
.user-routes {
  background: #FFFFFF;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
  h3 {
    margin-bottom: 20px;
  }
}
.user-routes__item {
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  cursor: pointer;
}
</style>
