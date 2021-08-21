<template>
  <div class="sign-up">
    <div class="sign-up__head">
      <h2>
        Sign Up
      </h2>
      <span>
        зарегистрироваться
      </span>
    </div>

    <form
      @submit.prevent="submit"
      autocomplete="off"
    >
      <input v-model="email" type="email" name="email">
      <input v-model="password" type="password" name="password">
      <p v-if="error">
        {{ error }}
      </p>
      <button class="btn">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import { setUser } from '~/plugins/setUser'
import { createUser } from '~/firebase/userApi'
import { db } from '~/firebase/firebaseApi'
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async submit() {
      console.log('this.email:', this.email)
      console.log('this.password:', this.password)
      await createUser(this.email, this.password)
        .then(async (user) => {
          await this.setUserData(user.uid)
          setUser(this.$store, user)
          this.$emit('success')
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
    async setUserData(uid) {
      const userData = {
        favoritePlaces: [],
        favoriteRoutes: [],
        createdRoutes: [],
        role: 'user',
        credentials: {
          userPanel: true,
          adminPanel: false,
        },
      }

      await db.collection('users').doc(uid).set(userData)
        .then(() => console.log('user data create successfuly'))
        .catch((err) => console.log('err:', err))
    }
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