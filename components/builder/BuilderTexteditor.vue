<template>
  <div class="builder-texteditor" v-html="text">
  </div>
</template>

<script>
export default {
  name: 'BuilderTexteditor',
  props: {
    text: {
      type: String,
      default: ''
    },
  },
}
</script>

<style>
</style>
