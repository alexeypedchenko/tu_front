<template>
  <div class="builder-texteditor" v-html="text">
  </div>
</template>

<script>
export default {
  name: 'Texteditor',
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
