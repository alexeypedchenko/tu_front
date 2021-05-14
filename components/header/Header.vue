<template>
  <div class="header">
    <div class="container">
      <app-navbar />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'Header',
  components: {
    AppNavbar: Navbar,
  },
}
</script>

<style lang="scss">
.header {
  position: fixed;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #000;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
}
</style>
