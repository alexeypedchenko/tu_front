<template>
  <div class="enter">
    <template v-if="!!user">
      hello
      <nuxt-link class="action" to="/profile">
        {{ user.displayName || user.email }}
      </nuxt-link>
      <profile-logout />
    </template>
    <template v-else>
      <button class="btn" @click="signUp">
        sign up
      </button>

      <button class="btn" @click="signIn">
        sign in
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Enter',
  computed: {
    ...mapState('auth', [
      'user',
      'profile',
    ])
  },
  methods: {
    signUp() {
      // <!-- зарегистрироваться -->
      const modalType = 'sign-up'
      this.$store.dispatch('auth/showModal', modalType)
    },
    signIn() {
      // <!-- войти -->
      const modalType = 'sign-in'
      this.$store.dispatch('auth/showModal', modalType)
    },
  }
}
</script>

<style lang="scss">
.enter {
  .btn {
    margin-left: 10px;
  }
}
</style>
