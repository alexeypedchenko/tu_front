<template>
  <div class="profile">
    <div class="container">
      <profile-user-data />
      <profile-markers />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.profile {
  .container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .user-data {
      width: 300px;
      margin-right: 20px;
    }
    .profile-markers {
      width: calc(100% - 320px);
    }
  }
}
</style>
