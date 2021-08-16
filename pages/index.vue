<template>
  <div class="home">
    <div class="container">
      home page
    </div>
    <div>
      user
      <pre>
        {{ $store.state.auth.user || '' }}
      </pre>
    </div>
    <div>
      profile
      <pre>
        {{ $store.state.auth.profile || '' }}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
