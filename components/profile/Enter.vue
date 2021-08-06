<template>
  <div class="enter">
    <button @click="signUp">
      sign up
    </button>

    <button @click="signIn">
      sign in
    </button>

    <button
      v-if="user"
      @click="logout"
    >
      logout
    </button>

    <modal
      :opened="modal"
      @close="hideModal"
    >
      <profile-sign-up />
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Enter',
  data() {
    return {
      modal: true,
    }
  },
  computed: {
    ...mapState('auth', [
      'user',
    ])
  },
  mounted() {
    console.log('enter component')
  },
  methods: {
    signUp() {
      // <!-- зарегистрироваться -->
      console.log('signUp')
      this.showModal()
    },
    signIn() {
      // <!-- войти -->
      console.log('signIn')
      this.showModal()
    },
    async logout() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/fireAuthAction')
          this.$router.push('/login')
        }).catch((error) => {
            console.log('logout error:', error)
        })
    },
    showModal() {
      this.modal = true
    },
    hideModal() {
      this.modal = false
    },
  }
}
</script>

<style>
</style>
