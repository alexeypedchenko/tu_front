<template>
  <label class="form-control">
    <span v-if="name" class="form-control__name">
      {{ name }}
    </span>
    <input
      class="form-control__input"
      type="text"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @change="change($event.target.value)"
      @input="change($event.target.value)"
    >
  </label>
</template>

<script>
export default {
  name: 'FormControl',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    change(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
.form-control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.form-control__name {
  margin-bottom: 4px;
  font-size: 12px;
}
.form-control__input {
  width: 100%;
  padding: 5px 10px;
}
</style>
