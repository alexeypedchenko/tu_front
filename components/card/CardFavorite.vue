<template>
  <div
    class="favorite"
    :class="{'favorite--exists' : inFavorite}"
  >
    <button
      @click.stop="toFavorite"
      class="favorite__btn"
      :class="{'btn--load' : load}"
    >
      <template v-if="!inFavorite">
        ☆
      </template>
      <template v-else>
        ★
      </template>
    </button>
    <modal-confirm
      :opened="modalOpened"
      text="Удалить место из избранного?"
      @close="closeConfirmModal"
      @yes="toggleToFavorite"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateDoc } from '~/firebase/firebaseApi'
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  name: 'CardFavorite',
  data() {
    return {
      load: false,
      modalOpened: false,
    }
  },
  computed: {
    ...mapState('auth', [
      'user',
      'profile',
    ]),
    collection() {
      if (this.type === 'marker') {
        return 'favoritePlaces'
      }
      if (this.type === 'route') {
        return 'favoriteRoutes'
      }
    },
    inFavorite() {
      return this.profile && this.profile[this.collection].includes(this.id)
    }
  },
  methods: {
    toFavorite() {
      if (!this.user) {
        const modalType = 'sign-in'
        this.$store.dispatch('auth/showModal', modalType)
        return
      }
      if (this.inFavorite) {
        this.showConfirmModal()
        return
      }
      this.toggleToFavorite()
    },
    async toggleToFavorite() {
      this.load = true
      const profile = JSON.parse(JSON.stringify(this.profile))
      const favoritePlaceIndex = profile[this.collection].findIndex((el) => el === this.id)
      if (favoritePlaceIndex === -1) {
        profile[this.collection].push(this.id)
      } else {
        profile[this.collection].splice(favoritePlaceIndex, 1)
      }
      await updateDoc('users', this.user.uid, profile)
        .then(() => {
          this.$store.dispatch('auth/setUserData', profile)
        })
        .catch((err) => {
          console.log('err:', err)
        })
        .finally(() => {
          this.load = false
          this.closeConfirmModal()
        })
    },
    showConfirmModal() {
      this.modalOpened = true
    },
    closeConfirmModal() {
      this.modalOpened = false
    },
  }
}
</script>

<style lang="scss">
.favorite {
  pointer-events: all;
}
.favorite__btn {
  border: none;
  font-size: 16px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
}
.favorite--exists button {
  background: lightgreen;
}
</style>
