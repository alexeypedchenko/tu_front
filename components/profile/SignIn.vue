<template>
  <div class="sign-up">
    <div class="sign-up__head">
      <h2>
        Sign In
      </h2>
      <span>
        войти
      </span>
    </div>

    <form
      @submit.prevent="submit"
      autocomplete="off"
    >
      <input v-model="email" type="email" name="email" placeholder="Введите e-mail">
      <input v-model="password" type="password" name="password" placeholder="Введите пароль">
      <p v-if="error">
        {{ error }}
      </p>
      <button class="btn">
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import { setUser } from '~/plugins/setUser'
import { userSignIn } from '~/firebase/userApi'
export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async submit() {
      await userSignIn(this.email, this.password)
        .then((user) => {
          if (!!user) {
            setUser(this.$store, user)
            this.$emit('success')
          }
        })
        .catch((err) => {
          console.log('err:', err)
          this.error = err.message
        })
    },
    clearData() {
      this.email = ''
      this.password = ''
      this.error = ''
    },
  }
}
</script>

<style lang="scss">
.sign-up {
  width: 400px;
  margin: 0 auto;
  form {
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: 20px;
    }
    input {
      padding: 5px 10px;
    }
  }
}
.sign-up__head {
  text-align: center;
  margin-bottom: 20px;
}
</style>