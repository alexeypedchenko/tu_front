<template>
  <div class="main-wrapper">
    <app-header />

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
  }
}
</script>

<style lang="scss">
.main {
  padding-top: 100px;
  flex-grow: 1;
}
.footer {
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #000;
  font-size: 12px;
}
.main-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
