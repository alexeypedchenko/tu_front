<template>
  <div class="auth-modal">
    <modal
      :opened="modalShow"
      @close="hideModal"
    >
      <profile-sign-up v-if="modalType === 'sign-up'" @success="hideModal"/>
      <profile-sign-in v-if="modalType === 'sign-in'" @success="hideModal"/>

      <div class="auth-modal-type">
        or
        <div
          v-for="type in modalTypes.filter((el) => el !== modalType)"
          :key="type"
          @click="$store.dispatch('auth/showModal', type)"
        >
          {{ type }}
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AuthModal',
  computed: {
    ...mapState('auth', [
      'modalShow',
      'modalType',
    ]),
  },
  data() {
    return {
      modalTypes: [
        'sign-up',
        'sign-in',
      ]
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch('auth/hideModal')
    },
  }
}
</script>

<style lang="scss">
.auth-modal-type {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 0 5px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
