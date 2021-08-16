export const state = () =>({
  modalShow: false,
  modalType: '',
  user: null,
  profile: null,
})

export const mutations = {
  SIGN_OUT(state) {
    state.user = null
  },
  SIGN_IN(state, authUser) {
    const {
      uid,
      email,
      displayName,
      emailVerified,
    } = authUser

    state.user = {
      uid,
      email,
      displayName,
      emailVerified,
    }
  },
  mutate(state, payload) {
    state[payload.prop] = payload.data
  },
}

export const actions = {
  fireAuthAction({commit}, authUser) {
    if (!authUser) {
      commit('SIGN_OUT')
    } else {
      commit('SIGN_IN', authUser)
    }
  },
  setUserData({commit}, userData) {
    const payload = {
      prop: 'profile',
      data: userData,
    }
    commit('mutate', payload)
  },

  showModal({commit}, type) {
    const modalShow = {
      prop: 'modalShow',
      data: true,
    }
    const modalType = {
      prop: 'modalType',
      data: type,
    }
    commit('mutate', modalShow)
    commit('mutate', modalType)
  },
  hideModal({commit}) {
    const modalShow = {
      prop: 'modalShow',
      data: false,
    }
    commit('mutate', modalShow)
  },
}
