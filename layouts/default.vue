<template>
  <div class="main-wrapper">
    <app-header v-if="!$store.state.smallHeaer" />

    <main class="main">
      <Nuxt />
    </main>

    <footer class="footer">
      <p>
        © TU 2021
      </p>
    </footer>
  </div>
</template>

<script>
import Header from '~/components/header/Header'
export default {
  components: {
    AppHeader: Header,
  },
  middleware: 'auth',
}
</script>

<style lang="scss">
</style>
