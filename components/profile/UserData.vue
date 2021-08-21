<template>
  <div class="user-data">
    <!-- <div class="user-data__head">
      img
    </div> -->
    <div class="user-data__body">
      <form-control
        name="Name"
        :value="localData.displayName"
        :disabled="!edited"
        placeholder="Your name"
        v-model="localData.displayName"
      />
      <form-control
        :name="user && user.emailVerified ? 'E-mail ✓' : 'E-mail'"
        :value="localData.email"
        :disabled="true"
        placeholder="Your email"
        v-model="localData.email"
      />

      <button
        v-if="user && !user.emailVerified"
        class="btn"
        :disabled="edited"
        @click="confirmEmail"
      >
        Confirm email
      </button>
    </div>
    <div class="user-data__footer">
      <template v-if="!edited">
        <button class="btn" @click="edited = !edited">
          edit data
        </button>
      </template>
      <template v-else>
        <button class="btn" @click="cancel">
          Cancel
        </button>
        <button class="btn" @click="save">
          Save
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import {
  userSendEmailVerification,
  userUpdate,
} from '~/firebase/userApi'
import { mapState } from 'vuex'

export default {
  name: 'UserData',
  data() {
    return {
      edited: false,
      localData: {},
      profileData: {
        image: '',
      },
    }
  },
  watch: {
    user() {
      this.setUserDAta()
    }
  },
  computed: {
    ...mapState('auth', [
      'user',
      'profile',
    ])
  },
  mounted() {
    console.log('this.user:', this.user)
    console.log('this.profile:', this.profile)
    this.setUserDAta()
  },
  methods: {
    setUserDAta() {
      if (!!this.user) {
        Object.keys(this.user).forEach((key) => {
          this.$set(this.localData, key, this.user[key])
        })

        return
      }
      this.$router.push('/login')
    },
    async confirmEmail() {
      if (this.edited) {
        return
      }
      await userSendEmailVerification()
      console.log('Confirm email')
      // TODO выводить модальное окно о том
      // что на e-mail адресс было отправлено письмо
      // с подтверждением пароля
    },
    async save() {
      console.log('save')
      await userUpdate({
        displayName: this.localData.displayName
      }).then(() => {
        this.$store.dispatch('auth/fireAuthAction', this.localData)
      })
      this.edited = false
    },
    cancel() {
      console.log('cancel')
      this.edited = false
    },
  }
}
</script>

<style lang="scss">
.user-data {
  background: #FFFFFF;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
}
.user-data__head {
  margin-bottom: 20px;
}
.user-data__body {
  margin-bottom: 20px;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  .form-control {
    input:disabled {
      background-color: transparent;
      border-color: transparent;
      color: #000;
      cursor: default;
    }
  }
}
</style>
