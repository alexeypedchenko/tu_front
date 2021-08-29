<template>
  <div
    class="modal"
    :class="{
      'modal--opened' : opened,
      'modal--full-screen' : size === 'fs',
    }"
  >
    <div class="modal__bg" @click="close"></div>
    <div class="modal__window">
      <button class="modal__close" @click="close">
        x
      </button>
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
  },
  mounted() {
    window.addEventListener('keyup', this.closeOnEscape)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    closeOnEscape({key, code}) {
      if (key === 'Escape' || code === 'Escape') {
        this.close()
      }
    }
  },
  destroyed() {
    window.removeEventListener('keyup', this.closeOnEscape)
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
}
.modal--opened {
  opacity: 1;
  pointer-events: all;
}
.modal__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(#000, 0.3);
}
.modal__window {
  position: relative;
  max-height: calc(100% - 100px);
  overflow: auto;
  padding: 40px 20px;
  width: 500px;
  max-width: 100%;
  background: #fff;
  border-radius: 2px;
  z-index: 2;
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 1px solid #000;
  z-index: 1;
}
.modal--full-screen {
  .modal__window {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    max-height: 100%;
    padding: 40px;
  }
}
</style>