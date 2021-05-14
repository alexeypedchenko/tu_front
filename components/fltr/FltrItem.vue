<template>
  <div class="fltr__item">
    <div class="fltr__item-head">
      <span
        v-if="title"
        class="fltr__item-title"
      >
        {{ title }}
      </span>
      <button
        v-if="currentValue"
        class="fltr__item-clear"
        @click="clear"
      >
        clear
      </button>
    </div>

    <select :name="name" @change="change">
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
    title: {
      type: String,
      default: '',
    },
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
      const props = {
        name: this.name,
        value: event.target.value
      }
      this.$emit('change', props)
    },
    clear() {
      const props = {
        name: this.name,
        value: '',
      }
      this.$emit('change', props)
    }
  }
}
</script>

<style lang="scss">
.fltr__item {
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #000;
  select {
    padding: 5px 10px;
    cursor: pointer;
    width: 100%;
  }
}
.fltr__item-head {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.fltr__item-clear {
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.fltr__item-title {
  margin-right: 10px;
}
</style>