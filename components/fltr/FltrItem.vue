<template>
  <div class="fltr__item fltr__item--select">
    <span
      v-if="name"
      class="fltr__item-name"
    >
      {{ name }}
    </span>
    <select name="tagFilter" @change="change">
      <option
        v-if="placeholder"
        disabled
        :selected="!list.includes(currentValue)"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="item in list"
        :key="item"
        :value="item"
        :selected="item === currentValue"
      >
        {{ item }}
      </option>
      <option value="">
        Clear
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FltrItem',
  props: {
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([])
    },
    currentValue: {
      type: String,
      default: ''
    },
  },
  methods: {
    change(event) {
      const {value, name} = event.target
      this.$emit('change', {name, value})
    }
  }
}
</script>

<style lang="scss">
.fltr__item {
  padding: 10px;
  border: 1px solid #000;
  select {
    padding: 5px 10px;
    cursor: pointer;
  }
}
.fltr__item-name {
  margin-right: 10px;
}
</style>