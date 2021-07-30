<template>
  <div class="dynamic-page">
    <div class="container">
      <h1>
        {{ page.name }}
      </h1>
      <p>
        {{ page.description }}
      </p>

      <br>
      <pre style="font-size: 10px">{{ page }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicPage',
  props: {
    page: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.dynamic-page {
  padding-top: 120px;
}
</style>
