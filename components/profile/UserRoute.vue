<template>
  <div class="user-route">
    <div class="user-route__head">
      <h4 class="user-route__name">
        {{ userRoute.name }}
      </h4>
      <button @click="showConfirmDeleteRouteModal">
        Удалить маршрут
      </button>
      <button @click="$emit('back')">
        Назад ⟵
      </button>
      <!-- TODO удаление маршрута -->
    </div>
    <div class="user-route__body">
      <div class="user-route__places">
        <h4>
          Места:
        </h4>
        <div class="user-route__places-list">
          <div
            class="user-route__place"
            v-for="(item, index) in userRoutePlaces"
            :key="item._id"
          >
            <div class="user-route__place-actions">
              {{ index + 1 }}.
              <button @click="showConfirmDeletePlaceModal(item._id)">
                Удалить
              </button>
              <button>
                Порядок /\ \/
              </button>
              <!-- TODO удаление места из маршрута -->
              <!-- TODO изменить порядковый номер места -->
            </div>
            <card
              :index="index"
              :item="item"
              size="sm"
            />
          </div>
        </div>
        <!-- TODO добавить новое место -->
      </div>
      <div class="user-route__map">
        <h4>
          Маршрут:
        </h4>
        <google-map
          :items="userRoutePlaces"
          :showRoute="true"
        />
      </div>
    </div>

    <modal-confirm
      :opened="confirmDeleteRouteModal"
      :text="`Удалить маршрут ${userRoute.name}?`"
      @close="closeConfirmDeleteRouteModal"
      @yes="deleteRoute"
    />
    <modal-confirm
      :opened="confirmDeletePlaceModal"
      text="Удалить место из избранного?"
      @close="closeConfirmDeletePlaceModal"
      @yes="deletePlaceByRoute"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateDoc } from '~/firebase/firebaseApi'

export default {
  name: 'UserRoutes',
  props: {
    userRoute: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      confirmDeletePlaceModal: false,
      confirmDeleteRouteModal: false,
      deletedPlaceId: null,
      showData: true,
    }
  },
  computed: {
    ...mapState('markers', [
      'list',
    ]),
    ...mapState('auth', [
      'user',
      'profile',
    ]),
    userRoutePlaces() {
      return this.list.filter((marker) => this.userRoute.list.includes(marker._id))
    },
  },
  methods: {
    async deleteRoute() {
      const profile = JSON.parse(JSON.stringify(this.profile))
      const routeIndex = profile.createdRoutes.findIndex((route) => route.name === this.userRoute.name)
      profile.createdRoutes.splice(routeIndex, 1)
      await this.updateProfile(profile).then(() => {
        this.closeConfirmDeleteRouteModal()
        this.$emit('back')
      })
    },
    async deletePlaceByRoute() {
      const profile = JSON.parse(JSON.stringify(this.profile))
      const route = profile.createdRoutes.find((route) => route.name === this.userRoute.name)
      const placeIndex = route.list.findIndex((id) => id === this.deletedPlaceId)
      route.list.splice(placeIndex, 1)
      await this.updateProfile(profile).then(() => {
        this.closeConfirmDeletePlaceModal()
        this.$emit('updateRoute', this.userRoute.name)
      })
    },
    async updateProfile(profile) {
      await updateDoc('users', this.user.uid, profile)
        .then(() => {
          this.$store.dispatch('auth/setUserData', profile)
        })
        .catch((err) => {
          console.log('err:', err)
        })
        .finally(() => {
          // this.load = false
        })
    },
    showConfirmDeletePlaceModal(id) {
      this.confirmDeletePlaceModal = true
      this.deletedPlaceId = id
    },
    closeConfirmDeletePlaceModal() {
      this.confirmDeletePlaceModal = false
      this.deletedPlaceId = null
    },
    showConfirmDeleteRouteModal() {
      this.confirmDeleteRouteModal = true
    },
    closeConfirmDeleteRouteModal() {
      this.confirmDeleteRouteModal = false
    },
  },
}
</script>

<style lang="scss">
.user-route {}
.user-route__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.user-route__name {}
.user-route__body {
  display: flex;
  h4 {
    margin-bottom: 10px;
  }
}
.user-route__places {
  width: 300px;
  margin-right: 20px;
}
.user-route__places-list {}
.user-route__place {
  margin-right: 16px;
  margin-bottom: 16px;
  .card {
    width: 280px;
  }
}
.user-route__place-actions {
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
.user-route__map {
  width: calc(100% - 320px);
  .google-map {
    margin-bottom: 0;
  }
}
</style>
