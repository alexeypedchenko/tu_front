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
          name: 'Home',
          ref: '/',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.navbar__link {
  color: lightseagreen;
  &:hover {
    text-decoration: underline;
  }
}
</style>
