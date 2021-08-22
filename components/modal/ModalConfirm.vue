<template>
  <modal
    class="modal-confirm"
    :opened="opened"
    @close="close"
  >
    <div class="modal-confirm__text">
      {{ text }}
    </div>
    <div class="modal-confirm__actions">
      <button class="btn" @click="$emit('yes')">
        Да
      </button>
      <button class="btn" @click="close">
        Нет
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalConfirm',
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal-confirm__text {
  text-align: center;
  color: #000;
  margin-bottom: 20px;
}
.modal-confirm__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  .btn:not(:last-child) {
    margin-right: 8px;
  }
}
</style>
