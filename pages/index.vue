<template>
  <div class="home">
    <div class="container">
      home
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('this.$store.auth.user:', this.$store.state.auth.user)
  }
}
</script>

<style>

</style>