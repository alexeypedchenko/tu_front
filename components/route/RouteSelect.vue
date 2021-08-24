<template>
  <div class="route-select">
    <span>
      Ваши маршруты:
    </span>
    <select
      v-if="profile"
      @change="selectRoute($event.target.value)"
    >
      <option disabled selected>
        Выбрать маршрут
      </option>
      <option
        v-for="route in profile.createdRoutes"
        :key="route.name"
        :value="route.name"
        :selected="route.name === editedUserRoute.name"
      >
        {{ route.name }}
      </option>
    </select>
    <div class="route-select__actions">
      <template v-if="settingUserRoute">
        <button class="btn btn--sm" @click="editRoute">
          Сохранить
        </button>
        <button class="btn btn--sm" @click="editRoute">
          Назад
        </button>
      </template>
      <button v-else class="btn btn--sm" @click="editRoute">
        Редактировать
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'profile-routes',
  watch: {
    'profile.createdRoutes'() {
      console.log('this.profile.createdRoutes:', this.profile.createdRoutes)
    },
  },
  computed: {
    ...mapState([
      'editedUserRoute',
      'settingUserRoute',
    ]),
    ...mapState('auth', [
      'profile',
    ]),
  },
  methods: {
    selectRoute(value) {
      const route = this.profile.createdRoutes.find((route) => route.name === value)
      this.$store.commit('setEditedUserRoute', route)
    },
    editRoute() {
      if (!this.editedUserRoute) {
        this.$store.commit('setEditedUserRoute', this.profile.createdRoutes[0])
      }
      this.$store.commit('toggleSettingUserRoute')
    },
  }
}
</script>

<style lang="scss">
.route-select {
  margin-right: 10px;
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    font-weight: 600;
    margin-right: 10px;
  }
  select {
    outline: none;
    padding: 3px 15px;
    margin-right: 10px;
  }
}
.route-select__actions {
  .btn:not(:last-child) {
    margin-right: 6px;
  }
}
</style>