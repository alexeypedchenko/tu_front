<template>
  <div class="search-fltr">
    <div v-if="title" class="search-fltr__title">
      {{ title }}
    </div>

    <input
      class="search-fltr__field"
      type="text"
      :value="value"
      @input="handleSearch($event)"
    >
  </div>
</template>

<script>
export default {
  name: 'SearchFltr',
  props: {
    title: {
      type: String,
      default: 'Search place:',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleSearch(event) {
      const props = {
        name: this.name,
        value: event.target.value,
      }

      this.$emit('input', props)
      this.$emit('change', props)
    }
  }
}
</script>

<style lang="scss">
.search-fltr {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #000;
}
.search-fltr__title {
  margin-right: 10px;
}
.search-fltr__field {
  padding: 5px;
  flex-grow: 1;
}
</style>
