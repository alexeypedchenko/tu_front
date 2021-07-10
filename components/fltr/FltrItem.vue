<template>
  <div
    ref="fltr"
    class="fltr__item"
    :class="{'fltr__item--opened' : opened}"
  >
    <div
      class="fltr__item-head"
      @click="toggle"
    >
      <span
        v-if="title"
        class="fltr__item-title"
      >
        {{ value || title }}
      </span>
      <button
        v-if="value"
        class="fltr__item-clear"
        @click="clear"
      >
        clear
      </button>
    </div>

    <div class="fltr__item-list">
      <li
        v-for="item in list"
        :key="item"
        @click="selectItem(item)"
      >
        {{ item }} - {{filtersCount[item] || 0 }}
      </li>
    </div>

    <!--
    <select
      :name="name"
      @change="change"
      @input="change"
    >
      <option
        v-if="placeholder"
        disabled
        :selected="!list.includes(value)"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="item in list"
        :key="item"
        :value="item"
        :selected="item === value"
        :disabled="!filtersCount[item]"
      >
        {{ item }} - {{filtersCount[item] || 0 }}
      </option>
    </select>
    -->
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
    value: {
      type: String,
      default: '',
    },
    filtersCount: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      opened: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.closeList)
  },
  methods: {
    selectItem(item) {
      console.log('item:', item)
      const props = {
        name: this.name,
        value: item
      }
      this.$emit('change', props)
      this.close()
    },
    clear() {
      const props = {
        name: this.name,
        value: '',
      }
      this.$emit('change', props)
    },
    toggle() {
      this.opened = !this.opened
    },
    open() {
      this.opened = true
    },
    close() {
      this.opened = false
    },
    closeList(event) {
      const {target} = event
      const {fltr} = this.$refs
      const fltrItem = target.closest('.fltr__item')
      if (fltrItem && fltrItem === fltr) {
      } else {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss">
.fltr__item {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  border-radius: 2px;
  font-size: 14px;
  padding: 12px 10px;
  cursor: pointer;

  transition: 0.2s;
  background: $gray-cl;
  &:hover {
    background: $gray-hover-cl;
  }
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
.fltr__item-list {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  min-width: 100%;
  width: max-content;
  border: 1px solid #000;
  padding: 5px - 0;
  list-style-type: none;
  z-index: 1;
  font-size: 14px;

  opacity: 0;
  transform: translate(0, 0);
  pointer-events: none;
  transition: 0.3s;


  li {
    white-space: nowrap;
    padding: 5px 10px;
    &:hover {
      background: #eee;
    }
  }
}
.fltr__item--opened {
  .fltr__item-list {
    opacity: 1;
    pointer-events: all;
    transform: translate(0, -1px);
  }
}
</style>