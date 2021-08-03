<template>
  <div class="container">
    <p class="page-text">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Text',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.page-text {
  font-size: 18px;
  line-height: 1.4;
}
</style>
