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

    <ul
      class="search-fltr__hints"
      :class="{'search-fltr__hints--show' : getHints.length && value !== getHints[0]}"
    >
      <li
        v-for="item in getHints"
        :key="item"
        @click="selectHint(item)"
      >
        {{ item }}
      </li>
    </ul>
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
    items: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    getHints() {
      if (!this.value) return []
      return this.items
        .filter((el) => {
          const name = el.name.toLowerCase().trim()
          const value = this.value.toLowerCase().trim()
          return name.includes(value)
        })
        .map((el) => el.name)
        .slice(0, 10)
    }
  },
  methods: {
    handleSearch(event) {
      const props = {
        name: this.name,
        value: event.target.value,
      }

      this.$emit('input', props)
      this.$emit('change', props)
    },
    selectHint(item) {
      const props = {
        name: this.name,
        value: item
      }

      this.$emit('input', props)
      this.$emit('change', props)
    }
  }
}
</script>

<style lang="scss">
.search-fltr {
  position: relative;
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
.search-fltr__hints {
  position: absolute;
  top: 100%;
  left: 0;
  // border: 1px solid #000;
  box-shadow: 0 0 0 1px #000;
  width: 100%;
  padding: 5px 0;
  background: #fff;
  z-index: 1;

  opacity: 0;
  transform: translate(0, 10px);
  pointer-events: none;
  transition: 0;

  li {
    white-space: nowrap;
    padding: 5px 10px;
    &:hover {
      background: #eee;
    }
  }
}
.search-fltr__hints--show {
  opacity: 1;
  pointer-events: all;
  transform: translate(0, 0);
  transition: 0.3s;
}
</style>
