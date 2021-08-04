<template>
  <p class="builder-text">
    {{ text }}
  </p>
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
.builder-text {
  font-size: 18px;
  line-height: 1.4;
}
</style>
