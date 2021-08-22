<template>
  <div
    class="favorite"
    :class="{'favorite--exists' : inFavorite}"
  >
    <button
      @click="toFavorite"
      :class="{'btn--load' : load}"
    >
      <template v-if="!inFavorite">
        to favorite
      </template>
      <template v-else>
        in favorite ✓
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
    inFavorite() {
      return this.profile && this.profile.favoritePlaces.includes(this.id)
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
      const favoritePlaceIndex = profile.favoritePlaces.findIndex((el) => el === this.id)
      if (favoritePlaceIndex === -1) {
        profile.favoritePlaces.push(this.id)
      } else {
        profile.favoritePlaces.splice(favoritePlaceIndex, 1)
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

<style>
.favorite--exists button {
  background: lightgreen;
}
</style>
