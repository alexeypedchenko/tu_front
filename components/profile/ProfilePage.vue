<template>
  <div class="profile-page">
    <div class="container">
      <ul class="profile-page-nav">
        <li
          v-for="link in links"
          :key="link.name"
        >
          <nuxt-link :to="link.ref">
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
      <div class="profile-page-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfilePage',
  data() {
    return {
      links: [
        {
          name: 'Профиль',
          ref: '/profile',
        },
        {
          name: 'Избранные места',
          ref: '/profile/favorite-places',
        },
        {
          name: 'Избранные маршруты',
          ref: '/profile/favorite-routes',
        },
        {
          name: 'Свои маршруты',
          ref: '/profile/user-routes',
        },
      ]
    }
  },
  watch: {
    user() {
      this.checkUserLogin()
    }
  },
  computed: {
    ...mapState('auth', [
      'user',
    ])
  },
  mounted() {
    this.checkUserLogin()
  },
  methods: {
    checkUserLogin() {
      if (!this.user) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss">
.profile-page {
  padding-bottom: 20px;
  .container {
    display: flex;
    align-items: flex-start;
    .profile-page-container {
      width: calc(100% - 320px);
    }
  }
}
.profile-page-nav {
  width: 300px;
  margin-right: 20px;
  background: #FFFFFF;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
  li:not(:last-child) {
    margin-bottom: 10px;
  }
  a {
    &:hover,
    &.nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
</style>
