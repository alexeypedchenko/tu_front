<template>
  <div class="login">
    <form
      class="login__form"
      @submit.prevent="auth"
    >
      <h2 class="login__title">
        login
      </h2>

      <!-- <v-text-field
        class="mb-5"
        v-model="fields.email"
        :rules="rules.emailRules"
        label="E-mail"
        required
      /> -->
      <input
        v-model="fields.email"
        type="email"
        placeholder="E-mail"
      >

      <!-- <v-text-field
        v-model="fields.password"
        class="mb-5"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.emptyRules"
        label="Password"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
        required
      /> -->
      <input
        v-model="fields.password"
        type="password"
        placeholder="Password"
      >

      <button :disabled="loading">
        Login
      </button>

      <p v-if="error">
        {{ error }}
      </p>

    </form>
  </div>
</template>

<script>
import {setUser} from '~/plugins/setUser'
import {userSignIn} from '~/firebase/userApi'

export default {
  data() {
    return {
      fields: {
        email: '',
        password: '',
      },
      rules: {
        emptyRules: [
          v => !!v || 'Should not be empty',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
      },
      error: null,
      passwordShow: false,
      valid: false,
      loading: false,
    }
  },
  mounted() {
    this.checkAuthUser()
  },
  methods: {
    async auth() {
      this.loading = true
      const {email, password} = this.fields
      await userSignIn(email, password)
        .then((authUser) => {
          setUser(this.$store, authUser)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log('err:', err)
          this.error = err.message
        })
        .finally(() => {
          this.loading = false
        })
    },
    checkAuthUser() {
      if (!!this.$store.state.auth.user) {
        this.$router.push('/')
      }
    },
  },
  layout: 'empty'
}
</script>

<style lang="scss">
.login {
  padding-top: 10vh;
}
.login__form {
  width: 300px;
  margin: 0 auto;
  max-width: 100%;
  input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 20px;
  }
  button {
    padding: 5px 10px;
  }
}
.login__title {
  margin-bottom: 20px;
}
</style>
