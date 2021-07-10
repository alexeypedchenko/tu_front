<template>
  <header class="small-header">
    <header-logo />

    <div class="small-header__actions">
      header actions
    </div>
  </header>
</template>

<script>
export default {
  name: 'SmallHeader',
}
</script>

<style lang="scss">
.small-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
