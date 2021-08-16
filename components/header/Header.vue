<template>
  <div class="header">
    <header-logo class="header__logo" />

    <app-navbar class="header__nav" />

    <profile-enter />
  </div>
</template>

<script>
import firebase from '~/firebase/firebaseApp'
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
  // position: fixed;
  // z-index: 999;
  background: lightcyan;
  // box-shadow: 0 10px 20px 0 rgba(#000, 0.1);
  // border-bottom: 1px solid #000;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: 20px;
  .container {
    display: flex;
    justify-content: space-between;
  }
}
.header__logo {
  margin-right: 60px;
}
.header__nav {
  margin-right: auto;
}
</style>
