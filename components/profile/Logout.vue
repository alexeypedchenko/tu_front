<template>
  <button
    class="btn"
    @click="logout"
  >
    logout
  </button>
</template>

<script>
import { auth } from '~/firebase/userApi'
import { setUser } from '~/plugins/setUser'

export default {
 name: 'Logout',
 methods: {
  async logout() {
    await auth
      .signOut()
      .then(() => {
        setUser(this.$store, null)
        // this.$router.push('/login')
      })
      .catch((error) => console.log('logout error:', error))
    },
  }
}
</script>

<style>
</style>
