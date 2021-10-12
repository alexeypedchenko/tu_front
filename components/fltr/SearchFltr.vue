<template>
  <div
    ref="searchFltr"
    class="search-fltr"
  >
    <div class="search-fltr__field">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.005 512.005" xml:space="preserve">
        <path fill="#d4d4d5" d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667 S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6 c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z" />
      </svg>
      <input
        type="text"
        :value="value"
        @input="handleSearch($event)"
        :placeholder="placeholder"
        @focus="showHints"
      >
      <span
        v-if="value"
        class="search-fltr__clear"
        @click="clearField"
      >
        clear
      </span>
    </div>

    <ul
      class="search-fltr__hints"
      :class="{'search-fltr__hints--show' : hintsIsVisible}"
    >
      <li
        v-for="item in getHints"
        :key="item.name"
        @click="selectHint(item.name)"
      >
        <img :src="item.image" :alt="item.name">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchFltr',
  props: {
    placeholder: {
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
    items: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      icon: '/icons/loupe.svg',
      localVal: null,
      hintsShow: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.outerClick)
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
        .map((el) => {return {
          name: el.name,
          image: el.image
        }})
        .slice(0, 10)
    },
    hintsIsVisible() {
      return this.hintsShow && this.getHints.length && this.value !== this.getHints[0].name
    }
  },
  methods: {
    handleSearch(event) {
      this.localVal = event.target.value
      this.emitData()
    },
    selectHint(item) {
      this.localVal = item
      this.hintsShow = false
      this.emitData()
    },
    clearField() {
      this.localVal = null
      this.emitData()
    },
    emitData() {
      const props = {
        name: this.name,
        value: this.localVal,
      }
      this.$emit('input', props)
      this.$emit('change', props)
    },
    showHints() {
      this.hintsShow = true
    },
    closeHints() {
      this.hintsShow = false
    },
    outerClick({target}) {
      const {searchFltr} = this.$refs
      const searchFltrParent = target.closest('.search-fltr')
      if (searchFltr === searchFltrParent) {
        return
      }
      this.closeHints()
    }
  }
}
</script>

<style lang="scss">
.search-fltr {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.search-fltr__field {
  width: 100%;
  position: relative;
  input {
    padding: 12px 10px;
    line-height: 1.4;
    width: 100%;
    padding-left: 35px;
    background: $gray-cl;
    border-radius: 2px;
    font-size: 14px;
    border: none;
  }
  svg {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
  }
}
.search-fltr__hints {
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #000;
  width: 100%;
  padding: 5px 0;
  background: #fff;
  z-index: 1;

  opacity: 0;
  transform: translate(0, 10px);
  pointer-events: none;
  transition: 0;

  li {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 5px 10px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    &:hover {
      background: #eee;
    }
  }
}
.search-fltr__clear {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  display: block;
  font-size: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
}
.search-fltr__hints--show {
  opacity: 1;
  pointer-events: all;
  transform: translate(0, -1px);
  transition: 0.3s;
}
</style>
