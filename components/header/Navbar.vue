<template>
  <div class="navbar">
    <ul class="navbar__list">
      <li
        v-for="link in links"
        :key="link.id"
        class="navbar__item"
      >
        <nuxt-link class="navbar__link" :to="link.ref">
          {{ link.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          id: 0,
          name: 'Главная',
          ref: '/',
        },
        {
          id: 1,
          name: 'Места',
          ref: '/places',
        },
        {
          id: 2,
          name: 'Маршруты',
          ref: '/routes',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.navbar__list {
  display: flex;
}
.navbar__item {
  &:not(:last-child) {
    margin-right: 20px;
  }
}
.navbar__link {
  color: lightseagreen;
  border-bottom: 1px solid transparent;
  &.nuxt-link-exact-active,
  &:hover {
    border-bottom-color: lightseagreen;
  }
}
</style>
