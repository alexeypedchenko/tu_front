<template>
  <div class="header">
    <header-logo class="header__logo" />

    <header-navbar class="header__nav" />

    <profile-enter />
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss">
.header {
  background: rgba(#eee, 0.3);
  margin-bottom: 20px;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
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
