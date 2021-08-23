<template>
  <div class="card-route">
    <button
      @click="showModal"
      :class="{'btn--load' : load}"
    >
      to route
    </button>

    <modal
      v-if="user && profile"
      :opened="modalOpened"
      @close="closeModal"
    >
      <div class="card-route-modal">
        <h3>
          Новый маршрут / Выбрать из списка
        </h3>

        <form-control
          name="Новый маршрут"
          placeholder="Введите название нового маршрута"
          v-model="routeName"
        />

        <div class="card-route-list">
          <div
            v-for="route in profile.createdRoutes"
            :key="route.name"
            @click="selectRoute(route.name)"
            class="card-route-item"
            :class="{'card-route-selected' : selectedRoute === route.name}"
          >
            {{ route.name }} {{ selectedRoute === route.name ? '✓' : '' }}
          </div>
        </div>

        <button class="btn" @click="toRoute">
          Подтвердить
        </button>

        <p>
          Посмотреть и отредактировать маршруты можно в
          <nuxt-link class="action" to="/profile">
            личном кабинете
          </nuxt-link>
        </p>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateDoc } from '~/firebase/firebaseApi'

export default {
  name: 'CardRoute',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      load: false,
      modalOpened: false,
      routeName: '',
      selectedRoute: null,
    }
  },
  computed: {
    ...mapState('auth', [
      'user',
      'profile',
    ]),
  },
  methods: {
    async toRoute() {
      const profile = JSON.parse(JSON.stringify(this.profile))
      if (!profile.createdRoutes.length) {
        if (!this.routeName.length) {
          alert('Введите новое имя')
          return
        }
        await this.createNewRoute(profile)
        return
      }
      if (this.routeName) {
        const index = profile.createdRoutes.findIndex((route) => route.name === this.routeName)
        if (index !== -1 ) {
          alert('Маршрут с таким именем уже существует, введите новое имя')
          return
        }
        await this.createNewRoute(profile)
        return
      }
      if (this.selectedRoute != null) {
        const route = profile.createdRoutes.find((route) => route.name === this.selectedRoute)
        const index = route.list.findIndex((id) => id === this.id)
        if (index !== -1 ) {
          alert('Место уже добавлено в маршрут, выберите другой или создайте новый')
          return
        }
        route.list.push(this.id)
        await this.updateProfileData(profile)
        return
      }
    },
    async createNewRoute(profile) {
      const route = {
        name: '',
        list: [],
      }
      route.name = this.routeName
      route.list.push(this.id)
      profile.createdRoutes.push(route)
      await this.updateProfileData(profile)
    },
    async updateProfileData(profile) {
      this.load = true
      await updateDoc('users', this.user.uid, profile)
        .then(() => {
          this.$store.dispatch('auth/setUserData', profile)
        })
        .catch((err) => {
          console.log('err:', err)
        })
        .finally(() => {
          this.load = false
          this.closeModal()
        })
    },
    selectRoute(id) {
      this.selectedRoute === id ?
        this.selectedRoute = null
        : this.selectedRoute = id
    },
    showModal() {
      if (!this.user) {
        const modalType = 'sign-in'
        this.$store.dispatch('auth/showModal', modalType)
        return
      }
      this.modalOpened = true
    },
    closeModal() {
      this.modalOpened = false
      this.clearData()
    },
    clearData() {
      this.routeName = ''
      this.selectedRoute = null
    }
  },
}
</script>

<style lang="scss">
.card-route-modal {
  h3 {
    margin-bottom: 20px;
  }
  .form-control {
    margin-bottom: 20px;
  }
  .btn {
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
  }
}
.card-route-list {
  margin-bottom: 20px;
}
.card-route-item {
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  &:hover {
    text-decoration: underline;
  }
}
.card-route-selected {
  text-decoration: underline;
}
</style>
