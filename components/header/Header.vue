<template>
  <div class="header">
    <div class="container">
      <app-navbar />

      <button
        v-if="user"
        @click="logout"
      >
        logout
      </button>
    </div>
  </div>
</template>

<script>
import firebase from '~/firebase/firebaseApp'
import Navbar from './Navbar'

export default {
  name: 'Header',
  components: {
    AppNavbar: Navbar,
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss">
.header {
  position: fixed;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #000;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  .container {
    display: flex;
    justify-content: space-between;
  }
}
</style>
