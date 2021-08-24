<template>
  <div class="profile-routes">
    <span>
      Ваши маршруты:
    </span>
    <select
      v-if="profile"
      @change="selectRoute($event.target.value)"
    >
      <option
        v-for="route in profile.createdRoutes"
        :key="route.name"
        :value="route.name"
        :selected="route.name === editedUserRoute"
      >
        {{ route.name }}
      </option>
    </select>
    <div class="profile-routes__actions">
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
      this.$store.commit('setEditedUserRoute', value)
    },
    editRoute() {
      if (!this.editedUserRoute) {
        this.$store.commit('setEditedUserRoute', this.profile.createdRoutes[0].name)
      }
      this.$store.commit('toggleSettingUserRoute')
    },
  }
}
</script>

<style lang="scss">
.profile-routes {
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
.profile-routes__actions {
  .btn:not(:last-child) {
    margin-right: 6px;
  }
}
</style>