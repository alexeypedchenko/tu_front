<template>
  <nuxt-link class="logo" to="/">
    Logo
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',
}
</script>

<style lang="scss">
.logo {
  width: 80px;
  height: 40px;
  background: lightskyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    font-style: italic;
  }
}
</style>
