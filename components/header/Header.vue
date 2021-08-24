<template>
  <div class="header">
    <header-logo class="header__logo" />

    <header-navbar class="header__nav" />

    <div class="header__profile">
      <profile-routes />
      <profile-enter />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss">
.header {
  margin-bottom: 20px;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
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
.header__profile {
  display: flex;
  align-items: center;
}
</style>
