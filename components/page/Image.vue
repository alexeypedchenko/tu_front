<template>
  <div class="image">
    <div class="container">
      <img :src="image" alt="image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'image',
  props: {
    image: {
      type: String,
      default: ''
    },
  },
}
</script>

<style>
.image img {
  width: 100%;
  height: auto;
  display: block;
}
</style>