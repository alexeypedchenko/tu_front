<template>
  <div class="builder-image">
    <img :src="image" alt="image">
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
.builder-image img {
  /* width: calc(100% + 100px);
  margin-left: -50px;
  margin-right: -50px; */
  width: 100%;
  height: auto;
  display: block;
}
</style>